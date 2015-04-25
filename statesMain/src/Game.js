Business.Game = function(game){
	this.player = null;
	this.platforms = null;
    this.cursors = null;
    this.stars = null;
    
    Business.score = 0;
    Business.scoreText = null;
    Business.starsCollected = 0;
};

Business.Game.prototype = {
	create: function(){

	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.add.sprite(0, 0, 'sky');

	this.platforms = this.add.group();
	this.platforms.enableBody = true;

	var ground = this.platforms.create(0, this.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    this.player = this.add.sprite(32, this.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.stars = this.add.group();
	this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 65, 0, 'star');
        star.scale.setTo(0.5,0.5);
        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    Business.scoreText = this.add.text(16, 16, 'Saving money is like free money falling from the sky! \nMoney Collected: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    this.cursors = this.input.keyboard.createCursorKeys();

	},

	update: function(){
    if (Business.starsCollected == 12){
        alert('All $120 collected, porting you back home!');
        Business.starsCollected = 0;
        this.state.start('Scene1');
    }
	//  Collide the player and the stars with the platforms
    this.physics.arcade.collide(this.player, this.platforms);
    this.physics.arcade.collide(this.stars, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -350;
    }
	},

	collectStar: function(player, star){
		 // Removes the star from the screen
    star.kill();
    //  Add and update the score
    Business.starsCollected++;
    Business.score += 10;
    Business.scoreText.text = 'Money Collected: $' + Business.score;
	}
};