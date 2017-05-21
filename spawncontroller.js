var maxHarvesters = 5;
var maxUpgraders = 7;
var maxBuilders = 1;
var maxAttackers = 0;
var maxDefenders = 0;
var maxRepairers = 2;
var maxTravelers = 8;
var maxClaimers = 0;

var spawnController = {

    run: function() {
    // Status message
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders  = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var travelers = _.filter(Game.creeps, (creep) => creep.memory.role == 'traveler');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        console.log('Harvesters: ' + harvesters.length
            + ' | Upgraders: ' + upgraders.length
            + ' | Builders: '  + builders.length
            + ' | Repairers: ' + repairers.length
            + ' | Defenders: ' + defenders.length
            + ' | Attackers: ' + attackers.length
            + ' | Travelers: ' + travelers.length
    //        + ' | Claimers: '  + claimers.length
        );

    // Spawn Creeps

        if(harvesters.length < maxHarvesters ) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        else if(defenders.length < maxDefenders) {
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,ATTACK,ATTACK,MOVE], undefined, {role: 'defender'});
            console.log('Spawning new defender: ' + newName);
        }
        else {
            if(upgraders.length < maxUpgraders ) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
                console.log('Spawning new upgrader: ' + newName);
            }
            else if(repairers.length < maxRepairers) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repairer', working: false});
                console.log('Spawning new repairer: ' + newName);
            }
            else if(builders.length < maxBuilders) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder', working: false});
                console.log('Spawning new builder: ' + newName);
            }
            else  if(travelers.length < maxTravelers) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'traveler', working: false, waypoint1: false});
                console.log('Spawning new traveler: ' + newName);
            }
            else if(attackers.length < maxAttackers) {
                var newName = Game.spawns['Spawn1'].createCreep([MOVE,ATTACK,ATTACK,MOVE], undefined, {role: 'attacker', waypoint: false});
                console.log('Spawning new attacker: ' + newName);
            }
            else if(claimers.length < maxClaimers) {
                var newName = Game.spawns['Spawn1'].createCreep([CLAIM,MOVE,MOVE,MOVE], undefined, {role: 'claimer', targetRoom: 'E93N34'});
                console.log('Spawning new Claimer: ' + newName);
            }

        }

    // Creepspawn indicator
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

	}
};

module.exports = spawnController;
