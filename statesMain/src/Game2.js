Business.Game2 = function(game){
	this.ball; // the this.ball! Our hero
    this.arrow; // rotating this.arrow 
    this.rotateDirection = 1; // rotate direction: 1-clockwise, 2-counterclockwise
    this.power = 0; // power to fire the this.ball
    this.hudText; // text to display this info
    this.charging=false; // are we charging the power?
    this.degToRad=0.0174532925; // degrees-radians conversion
    this.score = 0; // the score
    this.coin; // the this.coin you have to collect
    this.deadlyArray = []; // an array which will be filled with enemies
    this.thisOver = false; // flag to know if the this is over
    this.map;
    this.deadly;
    this.layer1;

	// these settings can be modified to change thisplay
	this.friction = 0.99; // friction affects this.ball speed
	this.ballRadius = 10; // radius of all elements
    this.rotateSpeed = 3; // this.arrow rotation speed
    this.minPower = 50; // minimum power applied to this.ball
    this.maxPower = 200; // maximum power applied to this.ball
  

};

Business.Game2.prototype = {
	create: function(){

	this.map = this.add.tilemap('game2map');
	this.map.addTilesetImage('gymset');

	this.layer1 = this.map.createLayer('backgroundLayer');
	this.layer1.resizeWorld();

	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.setScreenSize();

	this.ball = this.add.sprite(this.world.centerX,this.world.centerY,'phaser');
	this.ball.anchor.x = 0.5;
	this.ball.anchor.y = 0.5;
	
	// this.ball starting speed
	this.ball.xSpeed = 0;
	this.ball.ySpeed = 0;
	
	// the rotating this.arrow
	this.arrow = this.add.sprite(this.world.centerX,this.world.centerY,'arrow');
	this.arrow.anchor.x = -1;
	this.arrow.anchor.y = 0.5;

	
	//this.placeDeadly();

	this.deadly = this.add.sprite(Math.random()*700+40,Math.random()*500+70,'deadly');
	this.deadly.scale.setTo(0.3,0.3);
	this.deadly.anchor.x = 0.5;
	this.deadly.anchor.y = 0.5;

	this.coin = this.add.sprite(Math.random()*700+40,Math.random()*500+70,'star');
	this.coin.scale.setTo(0.6,0.6);
	this.coin.anchor.x = 0.5;
	this.coin.anchor.y = 0.5;
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
	

	},

	placeDeadly: function(){
		// first, create the enemy and set its anchor point in the center
		var deadly = this.add.sprite(0,0,'deadly');
		deadly.scale.setTo(0.2,0.2);
		deadly.anchor.x = 0.5;
		deadly.anchor.y = 0.5;
		
		// add the newly created enemy in the enemy array
		this.deadlyArray.push(deadly);
		
		// assign it a random position until such position is legal
		do{
			var randomX=Math.random()*(this.width-2*this.ballRadius)+this.ballRadius;
			var randomY=Math.random()*(this.height-2*this.ballRadius)+this.ballRadius;
			this.deadlyArray[this.deadlyArray.length-1].x=randomX;
			this.deadlyArray[this.deadlyArray.length-1].y=randomY;
		} 
		while (this.illegalDeadly());
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
		// the this is update only if it's not this over
		if(!this.thisOver){
			
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
			
			// if the player picked a this.coin, then update score and text, change this.coin position and add an enemy
			if(this.getDistance(this.ball,this.coin)<(this.ballRadius*2)*(this.ballRadius*2)){
				this.score += 10;
				this.placeDeadly();
				this.placeCoin();
				this.updateHud();	
			}
			
			// if the player hits an enemy, it's this over
			for(i=0;i<this.deadlyArray.length;i++){
				if(this.getDistance(this.ball,this.deadlyArray[i])<(this.ballRadius*2)*(this.ballRadius*2)){
					this.hudText.text = "You lose! \nYou got your money Ponzi'd away!";
					this.thisOver = true;
				}	
			}
		}
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
		if(this.ball.x>this.width-this.ballRadius){
			this.ball.x=this.width-this.ballRadius;
			this.ball.xSpeed*=-1
		}
		if(this.ball.y>this.height-this.ballRadius){
			this.ball.y=this.height-this.ballRadius;
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

	updateHud: function(){
		this.hudText.text = "Don't let Madoff steal your money! \nPower: "+this.power+" * Money Collected: $"+this.score+this.deadlyArray[0];
	}

};