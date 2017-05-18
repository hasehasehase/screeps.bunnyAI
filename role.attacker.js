var targetRoom = 'E93N31'

var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
// Attack procedure
        if(creep.room.name == targetRoom){
         //   creep.say('Bye Gary!', true)
            // Try to attack Creeps
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            // Attack Structures if no path ?!?
            else if (creep.attack(target) == ERR_NO_PATH) {
              target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            }
            else {
            // Attack Structures if no Creeps left
                target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: (s) => s.structureType != STRUCTURE_CONTROLLER
                });
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
// Move to Target room
        else{
            // Waypoint for E94N34
            if(creep.memory.waypoint == false){
                creep.moveTo(new RoomPosition(23,31, 'E94N34'));
                if(creep.pos == '[room E94N34 pos 23,31]') {
                    creep.memory.waypoint = true;
                }
            }
            else {
                creep.moveTo(new RoomPosition(24, 24, targetRoom));
                }
            }
        }
};

module.exports = roleAttacker;
