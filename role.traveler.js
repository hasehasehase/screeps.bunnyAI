var waypoint = new RoomPosition(6,16, 'E93N34');


var roleTraveler = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // Reset creep
        if(creep.carry.energy == 0 && creep.memory.working){
            creep.memory.working = false;
            creep.memory.waypoint1 = false;
        }
      //Go to work if full
        if(creep.carry.energy == creep.carryCapacity && !creep.memory.working){
            creep.memory.working = true;
        }
      //Go to source waypoint
        if(!creep.memory.working && !creep.memory.waypoint1){
          creep.moveTo(waypoint);
          //At waypoint, decide which source to take
            if(creep.pos == '[room E93N34 pos 6,16]' && !creep.memory.waypoint1){
                creep.memory.waypoint1 = true;
                var rdm = Math.floor(Math.random() * (100) + 1)
                if(rdm>=50){
                  creep.memory.source = 1
                }
                else {
                  creep.memory.source = 0
                }

            }
        }
        // FARM
        else if(creep.memory.waypoint1 && creep.carry.energy < creep.carryCapacity && creep.room !='[room E92N34]'){
            var sources = creep.room.find(FIND_SOURCES)
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
               creep.moveTo(sources[creep.memory.source]);
            }
        }
        //WORK
        else if(creep.memory.working){
            if(creep.room != '[room E92N34]'){
                creep.moveTo(new RoomPosition(48,35,'E92N34'))
            }
            else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                }
                else if(creep.pos.x == 36){
                    creep.moveTo(creep.room.controller)
                }
            }
        }
        else {
            creep.say('HELP ME');
            creep.memory.waypoint1 = false
        }
        if(creep.room.name == 'E93N34'){
            creep.memory.role = 'upgrader'
            creep.memory.source = 1
        }

	}
};

module.exports = roleTraveler;
