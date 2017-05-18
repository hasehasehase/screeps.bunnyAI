var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // Reset creep
      if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
      // Send creep to work
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }
      //Work
	    if(creep.memory.upgrading) {
        // Solution for Room E92N34
        if(creep.pos.x == 36){
            creep.moveTo(creep.room.controller)
        }
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
      }
      //harvest
      else {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
      }
	}
};

module.exports = roleUpgrader;
