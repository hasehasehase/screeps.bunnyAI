var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Reset creep
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            var rdm = Math.floor(Math.random() * (100) + 1)
            if (rdm >= 50) {
                creep.memory.source = 1
            } else {
                creep.memory.source = 0
            }
        }
        // Send creep to work
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        //Work
        if (creep.memory.working) {
            // Solution for Room E92N34
            if (creep.pos.x == 36) {
                creep.moveTo(creep.room.controller)
            }
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        //harvest
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source]);
            }
        }
    }
};

module.exports = roleUpgrader;
