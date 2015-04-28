Business.Bank = function(game){
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.cursors = null;
	this.player = null;	
	this.portal = null;
	this.banker1 = null;
	this.banker2 = null;
};

Business.Bank.prototype = {
	create: function(){
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.map = this.add.tilemap('bank');
	this.map.addTilesetImage('masstileset');

    this.layer1 = this.map.createLayer('backgroundLayer');
    this.layer2 = this.map.createLayer('blockedLayer');

    this.map.setCollisionBetween(1, 100000, true, this.layer2);

    this.layer1.debug = true;

    this.player = this.add.sprite(400, 300, 'dude');
    this.player.scale.setTo(0.8,0.8);
    this.physics.arcade.enable(this.player);
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.physics.enable(this.player);
    this.camera.follow(this.player);

    this.portal = this.add.sprite(400,540, 'door');
    this.portal.scale.setTo(0.5,0.5);
    this.portal.enableBody = true;
    this.physics.enable(this.portal);

    this.banker1 = this.add.sprite(280,240, 'mrkrabs');
    this.banker1.scale.setTo(0.4,0.4);
    this.banker1.enableBody = true;
    this.physics.enable(this.banker1);
    this.banker1.body.immovable = true;
    this.add.tween(this.banker1).to({ y:300 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    this.cursors = this.input.keyboard.createCursorKeys();
	},

	checkCollision1: function(player, portal){
		if(confirm("Porting back to main map.")){
		this.state.start('Scene1');
		}
	},

	update: function(){
	this.physics.arcade.collide(this.player, this.layer2);
	this.physics.arcade.collide(this.player, this.banker1);
	
	this.physics.arcade.overlap(this.player, this.portal, this.checkCollision1, null, this);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

	    if (this.cursors.up.isDown)
	    {
	        this.player.body.velocity.y = -200;
	        this.player.animations.stop();
	        this.player.frame = 4;
	    }
	    else if (this.cursors.down.isDown)
	    {
	        this.player.body.velocity.y = 200;
	        this.player.animations.stop();
	        this.player.frame = 4;
	    }

	    if (this.cursors.left.isDown)
	    {
	        this.player.body.velocity.x = -200;
	        this.player.animations.play('left');
	    }
	    else if (this.cursors.right.isDown)
	    {
	        this.player.body.velocity.x = 200;
	        this.player.animations.play('right');

	    }
	    else {
	   		this.player.animations.stop();

	    }
	}
};
