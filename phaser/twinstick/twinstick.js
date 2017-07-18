//Variables
var player;
var enemy;

//Game Init
var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
    preload: preload,
    create: create,
    update: update
});

//Helper functions
function loadImages(){
    game.load.image("player", "../../media/images/RiseOfTheChaosWizards/redmage.png");
}

function initSprites(){
    player = game.add.sprite(game.width/2, game.height/2, "player");
    player.scale.setTo(2, 2);
}

function initPhysics(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.set(0.5);
}

//Phaser functions
function preload() {
    loadImages();
}

function create() {
    game.stage.backgroundColor = "#ffffff";
    initSprites();
    initPhysics();
}

function update() {
    player.rotation = game.physics.arcade.angleToPointer(player);
}
