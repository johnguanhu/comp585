Business.Preload = function(game){
	// define width and height of the game
	Business.GAME_WIDTH = 800;
	Business.GAME_HEIGHT = 592;
};
Business.Preload.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Business.GAME_WIDTH-311)/2, (Business.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		//Tilemaps
		this.load.tilemap('map', 'assets/tilemaps/homephaser2.json', null, Phaser.Tilemap.TILED_JSON);
    	this.load.tilemap('game2map', 'assets/tilemaps/oneclickmini.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('scene2', 'assets/tilemaps/scene2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('bank', 'assets/tilemaps/bank.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('pokemontileset', 'assets/tilemaps/pokemontileset.png');
    	this.load.image('masstileset', 'assets/tilemaps/masstileset.png');
    	this.load.image('gymset', 'assets/tilemaps/gymset.png');
    	this.load.image('transparent', 'assets/transparent.png');
    	this.load.image('box', 'assets/blue-button.png');
    	this.load.image('optiontangle', 'assets/optiontangle.png');
		
		//Characters
    	this.load.image('phaser', 'assets/phaser-dude.png');
    	this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    	this.load.image('mrkrabs', 'assets/mrkrabs.png');
    	this.load.image('diane', 'assets/diane.png');

    	//Minigame 1
		this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/money.png');

        //Minigame 2
		this.load.image('deadly', "assets/madoff.png");
		this.load.image('arrow', "assets/arrow.png");

		//Minigame 3
		this.load.image('bullet', 'assets/invaders/bullet.png');
	    this.load.image('enemyBullet', 'assets/invaders/enemy-bullet.png');
	    this.load.spritesheet('invader', 'assets/invaders/invader32x32x4.png', 32, 32);
	    this.load.image('ship', 'assets/invaders/player.png');
	    this.load.spritesheet('kaboom', 'assets/invaders/explode.png', 128, 128);
	    this.load.image('starfield', 'assets/invaders/starfield.png');
	    this.load.image('background', 'assets/invaders/background2.png');

   		//Home Scene
	    this.load.image('phaser', 'assets/sprites/phaser-dude.png');
	    this.load.image('telephone', 'assets/telephone.png');
	    this.load.image('rectangle', 'assets/rectangle.png');
	    this.load.image('rectangle3', 'assets/tangle3.png');
	    this.load.image('wallet', 'assets/wallet.png');
	    this.load.image('tipsheet', 'assets/tipsheet.png');
	    this.load.image('moneyBar', 'assets/moneyBar.png');
	    this.load.image('happyBar', 'assets/happyBar.png');
	    this.load.image('door', 'assets/door.gif');

        
	},
	create: function(){
		// start the MainMenu state
		this.state.start('Scene1');
	}
};