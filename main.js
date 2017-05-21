var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleTraveler = require('role.traveler')
var roleClaimer = require('role.claimer');
var spawnController = require('spawncontroller');

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
// Spawn creeps
    spawnController.run();


// run creep execs
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role){
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'attacker':
                roleAttacker.run(creep);
                break;
            case 'defender':
                roleDefender.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'traveler':
                roleTraveler.run(creep);
                break;
            case 'claimer':
                roleClaimer.run(creep);
                break;
        }

    }
}
