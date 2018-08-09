var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
    preload: preload,
    create: create,
    update: update
});

var player;
var cursors;
var jumpButton;
var platforms;
var hazards;
var goal;

var playerSpawnX = 0;
var playerSpawnY = 540;

var levelNum;

function spawnPlayer() {
    player.x = playerSpawnX;
    player.y = playerSpawnY;
}

function startLevel(levelNum) {
    if (levelNum == 1) {
        //create our level
        playerSpawnX = 0;
        playerSpawnY = 540;

        platforms.create(200, 200, 'platform');
        platforms.create(500, 100, 'platform');
        platforms.create(0, 300, 'platform');
        platforms.create(100, 400, 'platform');
        platforms.create(300, 600, 'platform');
        platforms.create(900, 200, 'platform');
        platforms.create(900, 300, 'platform');
        platforms.create(900, 400, 'platform');
        platforms.create(900, 500, 'platform');
        platforms.create(900, 600, 'platform');
        platforms.create(800, 200, 'platform');
        platforms.create(1100, 400, 'platform');
        platforms.create(1100, 300, 'platform');
        platforms.create(1100, 200, 'platform');
        platforms.create(1100, 100, 'platform');
        platforms.create(1100, 0, 'platform');
        platforms.create(300, 500, 'platform');

        hazards.create(400, 100, 'hazard');
        hazards.create(800, 0, 'hazard');

        goal.create(1100, 500, 'goal');
    }
    spawnPlayer();
}

function progress() {
    platforms.destroy(true);
    hazards.destroy(true);
    goal.destroy(true);

    platforms = game.add.physicsGroup();
    hazards = game.add.physicsGroup();
    goal = game.add.physicsGroup();

    startLevel(levelNum += 1);
}

function initSprites(){
    game.add.sprite(0, -450, 'background'); //Adds the sprite called background at coordinates 0, -450
    player = game.add.sprite(playerSpawnX, playerSpawnY, 'player');
    player.scale.x = 2;
    player.scale.y = 2;
}

function initPhysics(){
    platforms = game.add.physicsGroup();
    hazards = game.add.physicsGroup();
    goal = game.add.physicsGroup();
    
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
}

function initInputs(){
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function preload() {
    game.load.crossOrigin = true; //Allows us to laod images from places other than phaser's custom sprite library
    game.stage.backgroundColor = '#85b5e1'; //Sets a default background color. We will cover it up later but leave this for now.

    game.load.image('background', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Over_the_clouds.jpg'); //Loads in an image from that IRL and changes its name to "background"
    game.load.image('player', '../../static/media/images/RiseOfTheChaosWizards/blackmage.png');
    game.load.image('platform', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/100px-Solid_black.svg.png');
    game.load.image('hazard', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/100px-Red.svg.png');
    game.load.image('goal', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Solid_green.svg/100px-Solid_green.svg.png');
    
    levelNum = 1;
}

function create() {
    game.world.setBounds(0, 0, 1920, 600);
    initSprites();
    initPhysics();
    initInputs();
    
    game.camera.follow(player);
    startLevel(levelNum);

    platforms.setAll('body.immovable', true);
}

function update() {
    player.body.velocity.x = 0;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, hazards, spawnPlayer, null);
    game.physics.arcade.overlap(player, goal, progress, null);

    if (cursors.left.isDown || leftButton.isDown) {
        player.body.velocity.x -= 300;
    }
    if (cursors.right.isDown || rightButton.isDown) {
        player.body.velocity.x += 300;
    }
    if (jumpButton.isDown && (player.body.touching.down || player.body.blocked.down)) {
        player.body.velocity.y = -350;
    }
}
