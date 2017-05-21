var targetRoom = 'E92N32'
var waypoint1 = Game.flags.AttackWaypoint.pos

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
            // Waypoint
            if(!creep.memory.waypoint){
                creep.moveTo(waypoint1);
                if(creep.pos == waypoint1) {
                    creep.memory.waypoint = true;
                }
            }
            else {
                creep.moveTo(new RoomPosition(24,24, targetRoom));
                console.log('lel')
                }
            }
        }
};

module.exports = roleAttacker;
