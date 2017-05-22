//var targetRoom = creep.memory.targetRoom

// var waypoint1 = Game.flags.AttackWaypoint.pos

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        console.log('Hello')
        //var targetRoom = creep.memory.targetRoom
        // Claim procedure
        if (creep.room.name == creep.memory.targetRoom) {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }

        // Move to Target room
        else {
            creep.moveTo(new RoomPosition(24, 24, creep.memory.targetRoom))
        }
    }
};

module.exports = roleClaimer;
