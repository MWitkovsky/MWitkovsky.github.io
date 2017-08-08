var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
    preload: preload,
    create: create,
    update: update
});

var map;
var platformLayer;

var player;
var moveSpeed;
var runMultiplier;
var maxSpeed;
var shiftModifier;
var grounded;

//Groups
var enemyGroup;

//Keys
var upButton;
var downButton;
var leftButton;
var rightButton;
var jumpButton;

function preload() {
    game.load.tilemap("tilemap", "level1.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("player", "/media/images/RiseOfTheChaosWizards/redmage.png");
    game.load.image("tiles", "/media/images/tiles/troid_spritesheet16.gif");
    game.load.image("enemy", "/media/images/RiseOfTheChaosWizards/blackmage.png");
}

function initWorld() {
    game.stage.backgroundColor = "#000000";

    map = game.add.tilemap("tilemap");
    map.addTilesetImage("troid_spritesheet16", "tiles");
    platformLayer = map.createLayer("platforms");
    platformLayer.resizeWorld();
    map.setCollisionBetween(1, 10000, true, "platforms");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    initWorld();
    initSprites();;
    game.camera.follow(player);
    initInput();
}

function initSprites() {
    player = game.add.sprite(50, game.height / 2, "player");
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 2000;
    player.body.gravity.x = 0;
    player.body.collideWorldBounds = true;
    player.body.drag.set(100);
    moveSpeed = 75;
    maxSpeed = 200;
    runMultiplier = 2;
}

function initGroups() {
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
}

function initInput() {
    cursors = game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    runButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    resetButton = game.input.keyboard.addKey(Phaser.Keyboard.R);

    jumpButton.onDown.add(jump, this);
}

function update() {
    defaultValues();
    game.physics.arcade.collide(player, platformLayer, groundCollision);
    game.physics.arcade.collide(enemyGroup, platformLayer);
    game.physics.arcade.collide(player, enemyGroup);

    handleMovement();
}

function handleMovement() {
    if (grounded) {
        if (runButton.isDown)
            runModifier = runMultiplier;
        else
            runModifier = 1;
        
        if (cursors.left.isDown || leftButton.isDown)
            player.body.velocity.x -= moveSpeed;
        if (cursors.right.isDown || rightButton.isDown)
            player.body.velocity.x += moveSpeed;
        
        player.body.velocity.setMagnitude(Math.min(maxSpeed * runModifier, player.body.velocity.getMagnitude()));
    }
}

function defaultValues() {
    player.body.drag.set(100);
    grounded = false;
}

function jump() {
    console.log(grounded);
    if (grounded) {
        player.body.velocity.y = -500;
        grounded = false;
    }
}

function groundCollision() {
    player.body.drag.set(1000);
    grounded = true;
}
