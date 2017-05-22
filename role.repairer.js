//var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader')
var wallHealth = 150000;

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find closest structure with less than max hits
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) =>
                    s.hits < wallHealth && s.structureType == STRUCTURE_WALL ||
                    s.hits < s.hitsMax && s.structureType == STRUCTURE_ROAD ||
                    s.structureType == STRUCTURE_RAMPART && s.hits < wallHealth ||
                    s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (structure.structureType == STRUCTURE_TOWER) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure);
                    }
                } else {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure);
                    }
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
