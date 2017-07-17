var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var cursors;
var jumpButton;
var platforms;

function preload(){
    game.load.crossOrigin = true; //Allows us to laod images from places other than phaser's custom sprite library
    game.stage.backgroundColor = '#85b5e1'; //Sets a default background color. We will cover it up later but leave this for now.
    game.load.baseURL = 'http://examples.phaser.io/assets/'; //If we want to use any of Phaser's built in sprites we can do that
    game.load.image('background', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Over_the_clouds.jpg'); //Loads in an image from that IRL and changes its name to "background"
    game.load.image('player', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Silhouette_of_man_standing_and_facing_forward.svg/20px-Silhouette_of_man_standing_and_facing_forward.svg.png');
}

function create(){
    game.add.sprite(0, -450, 'background'); //Adds the sprite called background at coordinates 0, -450
    player = game.add.sprite(0, 540, 'player');
    platforms = game.add.physicsGroup();
    
    game.world.setBounds(0, 0, 1920, 600);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 25;
    player.body.collideWorldBounds = true;
    
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    game.camera.follow(player);
}

function update(){
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown || leftButton.isDown){
        player.body.velocity.x -= 300;
    }
    if (cursors.right.isDown || rightButton.isDown){
        player.body.velocity.x += 300;
    }   
    if (jumpButton.isDown && (player.body.touching.down || player.body.blocked.down)){
        player.body.velocity.y = -350;
    }
}