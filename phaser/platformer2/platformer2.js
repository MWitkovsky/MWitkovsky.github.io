var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
    preload: preload,
    create: create,
    update: update
});

var map;
var platformLayer;

var player;

//Groups
var enemyGroup;


function preload() {
    game.load.tilemap("tilemap", "level1.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("player", "/media/images/RiseOfTheChaosWizards/redmage.png");
    game.load.image("tiles", "/media/images/tiles/troid_spritesheet16.gif");
    game.load.image("enemy", "/media/images/RiseOfTheChaosWizards/blackmage.png");
}

function create() {
    game.stage.backgroundColor = "#000000";
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(50, game.height / 2, "player");
    game.physics.arcade.enable(player);

    map = game.add.tilemap("tilemap");
    map.addTilesetImage("troid_spritesheet16", "tiles");

    platformLayer = map.createLayer("platforms");
    platformLayer.resizeWorld();
    
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 2000;
    player.body.gravity.x = 20;
    player.body.collideWorldBounds = true;
    player.body.drag.set(100);
    game.camera.follow(player);
    
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
}

function update() {

}
