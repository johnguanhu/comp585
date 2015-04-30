var money=Number(sessionStorage.money);
var happiness=Number(sessionStorage.happiness);
var moneyimg=null;
var moneylab=null;
var happyimg=null;
var happylab=null;


Business.Scene1 = function(game){
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.layer3 = null;
	this.layer4 = null;
	this.cursors = null;
	this.player = null;	
	this.portal = null;
	this.homePortal = null;
	this.bankPortal = null;
	this.game2Portal = null;

    this.money=Number(sessionStorage.money);
    this.happiness=Number(sessionStorage.happiness);
};

Business.Scene1.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.map = this.add.tilemap('map');

	    this.map.addTilesetImage('masstileset');
	    this.map.addTilesetImage('pokemontileset');

	    this.layer1 = this.map.createLayer('backgroundLayer');
	    this.layer2 = this.map.createLayer('blockedLayer');
	    this.layer3 = this.map.createLayer('shadowLayer');

	    this.map.setCollisionBetween(1, 100000, true, this.layer2);

	    this.layer1.debug = true;

	    this.player = this.add.sprite(200, 150, 'dude');
	    this.player.scale.setTo(0.8,0.8);

	    //  We need to enable physics on the player
	    this.physics.arcade.enable(this.player);
	    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

	    this.physics.enable(this.player);
	    this.camera.follow(this.player);

	    this.portal = this.add.sprite(253,45, 'transparent');
	    this.portal.scale.setTo(0.2,0.2);
	    this.portal.enableBody = true;
	    this.physics.enable(this.portal);

	    this.homePortal = this.add.sprite(643,85, 'transparent');
	    this.homePortal.scale.setTo(0.2,0.2);
	    this.homePortal.enableBody = true;
	    this.physics.enable(this.homePortal);

	    this.bankPortal = this.add.sprite(407,325, 'transparent');
	    this.bankPortal.scale.setTo(0.2,0.2);
	    this.bankPortal.enableBody = true;
	    this.physics.enable(this.bankPortal);

	    this.game2Portal = this.add.sprite(730,245, 'transparent');
	    this.game2Portal.scale.setTo(0.2,0.2);
	    this.game2Portal.enableBody = true;
	    this.physics.enable(this.game2Portal);

	    this.cursors = this.input.keyboard.createCursorKeys();


	    //bottom bar stuff
	    this.money=Number(sessionStorage.money);
        this.happiness=Number(sessionStorage.happiness);

        statsRec=this.add.sprite(0,0, 'rectangle3');
        statsRec.scale.setTo(.4,.5);

        moneyimg=this.add.sprite(10,50, 'money');
        moneylab=this.add.text(60,50,'err');
        happyimg=this.add.sprite(10,100,'happy');
        happylab=this.add.text(60,100,'err');

        moneyimg.scale.setTo(.42,.42);
        happyimg.scale.setTo(.017,.017);


        moneyimg.visible=false;
        moneylab.visible=false;
        happyimg.visible=false;
        happylab.visible=false;
        statsRec.visible=false;

        this.setUpMoney();
        this.setUpPause();


        var BusinessTips = this.add.button(730,580, "wallet"); 
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
               happyimg.visible=false;
               happylab.visible=false;
               statsRec.visible=false;
               boolean_paused=false;
           }
           else {
               console.log("pausing...")
               moneyimg.visible=true;
               moneylab.visible=true;
               happyimg.visible=true;
               happylab.visible=true;
               statsRec.visible=true;
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
	stopMotion: function(player){
		this.cursors.up.isDown=false;
		this.cursors.down.isDown=false;
		this.cursors.left.isDown=false;
		this.cursors.right.isDown=false;
	},

	checkCollision1: function(player, portal){
		//need to move down away from the building
		this.player.body.y=this.player.body.y+10;
		//stop the motion
		this.stopMotion(player);
		if(confirm("Porting you to collection minigame.")){
			this.layer1.destroy();
			this.layer2.destroy();
			this.layer3.destroy();
			this.portal.destroy();
			this.game2Portal.destroy();
			
			sessionStorage.money=Number(money);
        	sessionStorage.happiness=Number(happiness);
			this.state.start('Game');
		}
	},

	checkCollision2: function(player, portal){
		//need to move down away from the build
		this.player.body.y=this.player.body.y+10;
		//stop the motion
		this.stopMotion(player);
		if(confirm("Porting you home.")){
			this.layer1.destroy();
			this.layer2.destroy();
			this.layer3.destroy();
			this.portal.destroy();
			this.homePortal.destroy();
			
			sessionStorage.money=Number(money);
        	sessionStorage.happiness=Number(happiness);
			this.state.start('HomeScene');
		}
	},

	checkCollision3: function(player, portal){
		
		//need to move down away from the building
		this.player.body.y=this.player.body.y+10;
		//stop the motion
		this.stopMotion(player);
		if(confirm("Porting you to the bank.")){
			this.layer1.destroy();
			this.layer2.destroy();
			this.layer3.destroy();
			this.portal.destroy();
			this.bankPortal.destroy();
			
			sessionStorage.money=Number(money);
       		sessionStorage.happiness=Number(happiness);
			this.state.start('Bank');
		}else{


		}
	},

	checkCollision4: function(player, portal){
		//need to move left and down away from the building
		this.player.body.x=this.player.body.x-10;
		this.player.body.y=this.player.body.y+10;
		//stop the motion
		this.stopMotion(player);
		if(confirm("Porting you to the Ponzi minigame.")){
			this.layer1.destroy();
			this.layer2.destroy();
			this.layer3.destroy();
			this.portal.destroy();
			this.game2Portal.destroy();
			
			sessionStorage.money=Number(money);
        	sessionStorage.happiness=Number(happiness);
			this.state.start('Game2');
		}
	},

	update: function(){

		//bottom bar
		if(moneybar!=null){
            moneybar.width= Number(money);
            happybar.width= Number(happiness);
            moneylab.text=  Number(money).toString();
            happylab.text=  Number(happiness).toString();

            // if(moneylab!=null){
            //     moneyimg=this.add.sprite(10,50, 'money');
            //     moneylab=this.add.text(60,50,money.toString());
            //     happyimg=this.add.sprite(10,100,'happy');
            //     happylab=this.add.text(60,100,happiness.toString());
            // }

        }

		this.physics.arcade.collide(this.player, this.layer2);
		
		this.physics.arcade.overlap(this.player, this.portal, this.checkCollision1, null, this);
		this.physics.arcade.overlap(this.player, this.homePortal, this.checkCollision2, null, this);
		this.physics.arcade.overlap(this.player, this.bankPortal, this.checkCollision3, null, this);
		this.physics.arcade.overlap(this.player, this.game2Portal, this.checkCollision4, null, this);

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
