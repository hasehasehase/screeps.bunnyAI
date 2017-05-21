//var roleHarvester = require('role.harvester');
var roleRepairer = require('role.repairer')
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
            var rdm = Math.floor(Math.random() * (100) + 1)
            if(rdm>=50){
              creep.memory.source = 1
            }
            else {
              creep.memory.source = 0
            }
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.working) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                roleRepairer.run(creep)
            }
            }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;
