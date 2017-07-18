//Variables
var player;
var weapon;

var enemies;
var maxEnemies;
var currentEnemies;

//Game Init
var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
    preload: preload,
    create: create,
    update: update
});

//Helper functions
function loadImages(){
    game.load.image("player", "../../media/images/RiseOfTheChaosWizards/redmage.png");
    game.load.image("fireball", "../../media/images/fireball.png");
    game.load.image("enemy", "../../media/images/RiseOfTheChaosWizards/blackmage.png");
}

function initSprites(){
    player = game.add.sprite(game.width/2, game.height/2, "player");
    player.scale.setTo(2, 2);
    
    weapon = game.add.weapon(30, "fireball");
}

function initPhysics(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.set(0.5);
    
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 300;
    weapon.fireRate = 100;
    weapon.trackSprite(player, 0, 0, true);
    weapon.bullets.forEach(function(bullet){
        bullet.anchor.set*(0.5);
        bullet.alpha = 0.9;
    });
}

function initGameSettings(){
    maxEnemies = 10;
    currentEnemies = 0;
    
    enemies = game.add.group();
    enemies.enableBody = true;
}

function spawnEnemies(){
    for (i=currentEnemies; i<maxEnemies; i++){
        var enemy = enemies.create(game.world.randomX, 0, "enemy");
        enemy.scale.setTo(2, 2);
        enemy.anchor.set(0.5);
        ++currentEnemies;
    }
}

function handleSpawns(){
    if(currentEnemies < maxEnemies){
        spawnEnemies();
    }
}

function handleAI(){
    enemies.forEach(function(enemy){
       game.physics.arcade.moveToObject(enemy, player, 125); 
    });
}

function killEnemy(bullet, enemy){
    bullet.kill();
    enemy.kill();
    --currentEnemies;
}

function handleCollisions(){
    game.physics.arcade.overlap(weapon.bullets, enemies, killEnemy);
}

function handleInput(){
    if(game.input.activePointer.isDown)
        weapon.fire();
}

//Phaser functions
function preload() {
    loadImages();
}

function create() {
    game.stage.backgroundColor = "#ffffff";
    initSprites();
    initPhysics();
    initGameSettings();
}

function update() {
    player.rotation = game.physics.arcade.angleToPointer(player);
    
    handleSpawns();
    handleAI();
    handleCollisions();
    handleInput();
}
