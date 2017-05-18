var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleTraveler = require('role.traveler')


var maxHarvesters = 5;
var maxUpgraders = 7;
var maxBuilders = 2;
var maxAttackers = 0;
var maxDefenders = 0;
var maxRepairers = 3;
var maxTravelers = 13;

module.exports.loop = function () {

// Clear non-existing creep memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

// Activate Towers
    var tower = Game.getObjectById('591b207a7f20becb2f68d28b');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

// Status message
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders  = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var travelers = _.filter(Game.creeps, (creep) => creep.memory.role == 'traveler');
    console.log('Harvesters: ' + harvesters.length
        + ' | Upgraders: ' + upgraders.length
        + ' | Builders: '  + builders.length
        + ' | Repairers: ' + repairers.length
        + ' | Defenders: ' + defenders.length
        + ' | Attackers: ' + attackers.length
        + ' | Travelers: ' + travelers.length);

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

// run creep execs
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep)
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep)
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
        }
        if(creep.memory.role == 'traveler') {
            roleTraveler.run(creep)
        }
    }
}
