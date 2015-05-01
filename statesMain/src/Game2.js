var money=Number(sessionStorage.money);
var happiness=Number(sessionStorage.happiness);
var moneyimg=null;
var moneylab=null;
var happyimg=null;
var happylab=null;


Business.Game2 = function(game){
	this.ball=null; // the this.ball! Our hero
    this.arrow=null; // rotating this.arrow 
    this.rotateDirection = 1; // rotate direction: 1-clockwise, 2-counterclockwise
    this.power = 0; // power to fire the this.ball
    this.hudText; // text to display this info
    this.charging=false; // are we charging the power?
    this.degToRad=0.0174532925; // degrees-radians conversion
    this.score = 0; // the score
    this.coin=null; // the this.coin you have to collect
    this.deadlyArray = []; // an array which will be filled with enemies
    this.thisOver = false; // flag to know if the this is over
    this.map=null;
    this.deadly=null;
    this.layer1=null;

	// these settings can be modified to change thisplay
	this.friction = 0.99; // friction affects this.ball speed
	this.ballRadius = 10; // radius of all elements
    this.rotateSpeed = 3; // this.arrow rotation speed
    this.minPower = 50; // minimum power applied to this.ball
    this.maxPower = 200; // maximum power applied to this.ball
    this.gamewidth = 790;

    this.money=Number(sessionStorage.money);
    this.happiness=Number(sessionStorage.happiness);
  

};

Business.Game2.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.map = this.add.tilemap('game2map');
		this.map.addTilesetImage('gymset');

		this.layer1 = this.map.createLayer('backgroundLayer');

		this.ball = this.add.sprite(400,560,'phaser');
		this.ball.anchor.x = 0.5;
		this.ball.anchor.y = 0.5;
		
		// this.ball starting speed
		this.ball.xSpeed = 0;
		this.ball.ySpeed = 0;
		this.ball.enableBody = true;
	    this.physics.enable(this.ball);
		
		// the rotating this.arrow
		this.arrow = this.add.sprite(this.world.centerX,this.world.centerY,'arrow');
		this.arrow.anchor.x = -1;
		this.arrow.anchor.y = 0.5;

		
		//this.placeDeadly();
		this.deadly = this.add.group();
	    for (var i = 0; i < 4; i++){
			this.deadly = this.add.sprite(Math.random()*800+40,Math.random()*400+70,'deadly');
			this.deadly.scale.setTo(0.25,0.25);
			this.deadly.anchor.x = 0.5;
			this.deadly.anchor.y = 0.5;
			this.deadly.enableBody = true;
	    	this.physics.enable(this.deadly);
	    	this.add.tween(this.deadly).to({y:Math.random()*300 }, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
		}

		this.coin = this.add.sprite(Math.random()*700+40,Math.random()*500+70,'star');
		this.coin.scale.setTo(0.6,0.6);
		this.coin.anchor.x = 0.5;
		this.coin.anchor.y = 0.5;
		this.coin.enableBody = true;
	    this.physics.enable(this.coin);
		//this.placeCoin();

		this.hudText = this.add.text(5,0,"",{ 
			font: "33px Arial",
			fill: "#ffffff", 
			align: "left" 
		});
		
		// update text content
		this.updateHud();
		
		// listener for input down
		this.input.onDown.add(this.charge, this);
		
		// bottom bar stuff
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
        moneyUp=this.add.sprite(400,600, 'arrow');

        reset=this.add.sprite(450,600, 'test');


        moneyUp.inputEnabled=true;
        moneyUp.events.onInputDown.add(function(){
            money=money+10;
            happiness=happiness+10;
        });
        reset.inputEnabled=true;
        reset.events.onInputDown.add(function(){
            money=0;
            happiness=0;
    });

        moneybar = this.add.sprite(0,600,'moneyBar');
        moneybar.scale.setTo(.1,.1);

        moneybar.width=money*10;

        happybar = this.add.sprite(0,620,'happyBar');
        happybar.scale.setTo(.1,.1);

        happybar.width=happiness*10;
    },

	/*placeDeadly: function(){
		// first, create the enemy and set its anchor point in the center
		this.deadly = this.add.sprite(Math.random()*700+40,Math.random()*500+70,'deadly');
		this.deadly.scale.setTo(0.2,0.2);
		this.deadly.anchor.x = 0.5;
		this.deadly.anchor.y = 0.5;
		
		// add the newly created enemy in the enemy array
		this.deadlyArray.push(this.deadly);
		
		// assign it a random position until such position is legal
		
			var randomX=Math.random()*(this.width-2*this.ballRadius)+this.ballRadius;
			var randomY=Math.random()*(this.height-2*this.ballRadius)+this.ballRadius;
			this.deadlyArray[this.deadlyArray.length-1].x=randomX;
			this.deadlyArray[this.deadlyArray.length-1].y=randomY;
		
	},

	illegalDeadly: function(){
		// if the distance between the enemy and the this.ball is less than three times the radius, it's NOT legal
		if(this.getDistance(this.ball,this.deadlyArray[this.deadlyArray.length-1])<(this.ballRadius*3)*(this.ballRadius*3)){
			return true;
		}
		
		// if the distance between the enemy and any other enemy is less than two times the radius, it's NOT legal
		for(var i=0;i<this.deadlyArray.length-1;i++){
			if(this.getDistance(this.deadlyArray[i],this.deadlyArray[this.deadlyArray.length-1])<(this.ballRadius*2)*(this.ballRadius*2)){
				return true
			}
		}
		// otherwise it's legal	
		return false;
	},

	/*placeCoin: function(){
		// assign the this.coin a random position until such position is legal
		do{
			this.coin.x=Math.random()*(this.width-2*this.ballRadius)+this.ballRadius;
			this.coin.y=Math.random()*(this.height-2*this.ballRadius)+this.ballRadius;
		} 
		//while (this.illegalCoin());
	},

	illegalCoin: function(){
		// if the distance between the this.coin and any this.ball is less than 2.5 times the radius, it's NOT legal
		if(this.getDistance(this.ball,this.coin)<(this.ballRadius*2.5)*(this.ballRadius*2.5)){
			return true;
		}
		
		// if the distance between the this.coin and any enemy is less than three times the radius, it's NOT legal
		for(i=0;i<this.deadlyArray.length;i++){
			if(this.getDistance(this.deadlyArray[i],this.coin)<(this.ballRadius*3)*(this.ballRadius*3)){
				return true
			}
		}
		
		// otherwise it's legal
		return false;	
	},*/
	
	update: function(){
		//bottom bar stuff
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



		// update only if game isn't over
		this.physics.arcade.overlap(this.ball, this.deadly, this.gameOver, null, this);
		this.physics.arcade.overlap(this.ball, this.coin, this.collectCoin, null, this);
			
		// when the player is charging the power, this is increased until it reaches the maximum allowed
		if(this.charging){
			this.power++;
			this.power = Math.min(this.power,this.maxPower)    
			// then this text is updated
			this.updateHud();		
		}
		
		// if the player is not charging, keep rotating the this.arrow
		else{
			this.arrow.angle+=this.rotateSpeed*this.rotateDirection;
		}
		
		// update this.ball position according to its speed
		this.ball.x+=this.ball.xSpeed;
		this.ball.y+=this.ball.ySpeed;
		
		// handle wall bounce
		this.wallBounce();
		
		// reduce this.ball speed using friction
		this.ball.xSpeed*=this.friction;
		this.ball.ySpeed*=this.friction;
		
		// update this.arrow position
		this.arrow.x=this.ball.x;
		this.arrow.y=this.ball.y;
	},
		
	// function to handle bounces. Just check for this boundary collision
	wallBounce: function(){
		if(this.ball.x<this.ballRadius){
			this.ball.x=this.ballRadius;
			this.ball.xSpeed*=-1
		}
		if(this.ball.y<this.ballRadius){
			this.ball.y=this.ballRadius;
			this.ball.ySpeed*=-1
		}
		if(this.ball.x>800-this.ballRadius){
			this.ball.x=800-this.ballRadius;
			this.ball.xSpeed*=-1
		}
		if(this.ball.y>590-this.ballRadius){
			this.ball.y=590-this.ballRadius;
			this.ball.ySpeed*=-1
		}    
	},

	getDistance: function(from,to){
		var xDist = from.x-to.x
		var yDist = from.y-to.y;
		return xDist*xDist+yDist*yDist;
	},

	charge: function(){
		this.power = this.minPower;
		this.input.onDown.remove(this.charge, this); 
		this.input.onUp.add(this.fire, this);  
		this.charging=true;
	},

	fire: function(){
		this.input.onUp.remove(this.fire, this); 
		this.input.onDown.add(this.charge, this);
		this.ball.xSpeed += Math.cos(this.arrow.angle*this.degToRad)*this.power/20;
		this.ball.ySpeed += Math.sin(this.arrow.angle*this.degToRad)*this.power/20;
		this.power = 0;
		this.updateHud();
		this.charging=false; 
		this.rotateDirection*=-1;
	},

	collectCoin: function(player, coin){
		this.coin.kill();
		Business.score+=10;
		money+=10;
		this.coin = this.add.sprite(Math.random()*700+40,Math.random()*500+70,'star');
		this.coin.scale.setTo(0.6,0.6);
		this.coin.anchor.x = 0.5;
		this.coin.anchor.y = 0.5;
		this.coin.enableBody = true;
	    this.physics.enable(this.coin);
	},

	gameOver: function(player, deadly){
	   sessionStorage.money=Number(money);
        sessionStorage.happiness=Number(happiness);
    	

		this.hudText.text = "Madoff Ponzi'd your money away!\nPorting you back home..."
		this.state.start('Scene1');
	},

	updateHud: function(){
		this.hudText.text = "Don't let Madoff steal your money! \nPower: "+this.power+" \nTotal Money: $"+Business.score;
	}

};