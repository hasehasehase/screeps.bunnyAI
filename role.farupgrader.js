var waypoint = new RoomPosition(6,16, 'E93N34');


var roleFarUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0 && creep.memory.working == true){
            creep.memory.working = false;
            creep.memory.waypoint1 = false;
        }
        if(creep.carry.energy == creep.carryCapacity && creep.memory.working == false){
            creep.memory.working = true;
        }
        if(creep.memory.working == false && creep.memory.waypoint1 == false){
          creep.moveTo(waypoint);
            if(creep.pos == '[room E93N34 pos 6,16]' && creep.memory.waypoint1 == false){
                creep.memory.waypoint1 = true;
            }
        }
        else if(creep.memory.waypoint1 == true && creep.carry.energy < creep.carryCapacity && creep.room !='[room E92N34]'){
            var sources = creep.room.find(FIND_SOURCES)
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
               creep.moveTo(sources[0]);
            }
        }

        else if(creep.memory.working == true){
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
        }

	}
};

module.exports = roleFarUpgrader;
