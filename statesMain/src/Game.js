var money=Number(sessionStorage.money);
var happiness=Number(sessionStorage.happiness);
var moneyimg=null;
var moneylab=null;
var happyimg=null;
var happylab=null;

Business.Game = function(game){
	this.player = null;
	this.platforms = null;
    this.cursors = null;
    this.stars = null;
    
    Business.score = 0;
    Business.scoreText = null;
    Business.starsCollected = 0;

    this.money=Number(sessionStorage.money);
    this.happiness=Number(sessionStorage.happiness);
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
        Business.scoreText = this.add.text(16, 16, 'Saving money is like free money falling from the sky! \nTotal Money: $'+Business.score, { fontSize: '32px', fill: '#000' });

        //  Our controls.
        this.cursors = this.input.keyboard.createCursorKeys();

    	//bottom bar stuff
        this.money=Number(sessionStorage.money);
        this.happiness=Number(sessionStorage.happiness);


        moneyimg=this.add.sprite(10,50, 'money');
        moneylab=this.add.text(60,50,'err');
        happimg=this.add.sprite(10,100,'happy');
        happylab=this.add.text(60,100,'err');
        moneyimg.visible=false;
        moneylab.visible=false;
        happimg.visible=false;
        happylab.visible=false;

        this.setUpMoney();
        this.setUpPause();


        var BusinessTips = this.add.button(750,580, "wallet"); 
        BusinessTips.scale.setTo(.22,.22);
        BusinessTips.inputEnabled=true;
        tips = this.add.sprite(200, 200, 'tipsheet');
        //    tipword=this.add.text(tips.x, tips.y , "Tips go here");
        tips.scale.setTo(0.75,0.75);
        tips.visible=false;
            //    tipword.visible=false;

        BusinessTips.onInputDown.add(function(){
            if (this.boolean_clicked){
            //    tipword.visible=false;
                this.tips.visible=false;
                this.boolean_clicked=false;
            }
            else {
               //   tipword.visible=true;
               this.tips.visible=true;
               this.boolean_clicked=true;
           }
        })

    },
    setUpPause: function (){
        var Pause_Label = this.add.button(650,607, "pause"); 

        Pause_Label.inputEnabled=true;

        Pause_Label.onInputDown.add(function(){
           if (boolean_paused){
               console.log("unpausing...")
               moneyimg.visible=false;
               moneylab.visible=false;
               happimg.visible=false;
               happylab.visible=false;
               boolean_paused=false;
           }
           else {
               console.log("pausing...")
               moneyimg.visible=true;
               moneylab.visible=true;
               happimg.visible=true;
               happylab.visible=true;
               boolean_paused=true;
           }
       })

    },

   setUpMoney: function (){
        moneyUp=this.add.sprite(400,600, 'test');

        moneyUp.inputEnabled=true;
        moneyUp.events.onInputDown.add(function(){
            money=money+1;
            happiness=happiness+1;
        });

        moneybar = this.add.sprite(0,600,'moneyBar');
        moneybar.scale.setTo(.1,.1);

        moneybar.width=money*10;

        happybar = this.add.sprite(0,620,'happyBar');
        happybar.scale.setTo(.1,.1);

        happybar.width=happiness*10;
    },

	update: function(){
        // money/happy bar
        if(moneybar!=null){
            moneybar.width= Number(money);
            happybar.width= Number(happiness);
            moneylab.text=  Number(money).toString();
            happylab.text=  Number(happiness).toString();

            // if(moneylab!=null){
            //     moneyimg=this.add.sprite(10,50, 'money');
            //     moneylab=this.add.text(60,50,money.toString());
            //     happimg=this.add.sprite(10,100,'happy');
            //     happylab=this.add.text(60,100,happiness.toString());
            // }

        }

        if (Business.starsCollected == 12){
            alert('All $120 collected, porting you back home!');
            Business.starsCollected = 0;
            Business.score=0;
            sessionStorage.money=Number(money);
            sessionStorage.happiness=Number(happiness);
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
    star.kill();//sessionStorage
    //  Add and update the score
    Business.starsCollected++;
    Business.score += 10;
    money+=10;
    Business.scoreText.text = 'Total Money Collected: $' + Business.score;
	}
};