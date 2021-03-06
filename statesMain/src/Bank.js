var map= null;
var layer1= null;
var layer2= null;
var layer3= null;
var cursors= null;
var sprite= null;
var line= null;
var storage= null;
var moneybar= null;
var happybar= null;
var tileHits = null;
var plotting = false;
var dialogBool=false;
var boolean_clicked=false;
var boolean_paused=false;
var phoneBool=false;
var reminded=false;
var moneyReader=null;
var money=Number(sessionStorage.money);
var happiness=Number(sessionStorage.happiness);
var happyReader=null;
var moneyimg=null;
var moneylab=null;
var happyimg=null;
var happylab=null;
var a=   null;
var a1=  null;
var b=  null;
var b1=  null;
var c=  null; 
var c1= null;
var d=   null;
var d1= null;
var choicetoggle=false;
var decision_made=false;
var dial;
var agentname;
var agentbox;
var agentquote;
var playerbox;
var playerquote;
var playername;
var currentStep=0;
var texts = [];
var bankbuttons = [];
var next;
var reminder;
var remindertext;
var paused;
var bgColor='#B4D9E7';
var BankDialog = null;
var OneLinerDialog = null;


Business.Bank = function(game){
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.cursors = null;
	this.player = null;	
	this.portal = null;
	this.banker1 = null;
	this.banker2 = null;
  this.dial= null;
  this.storage= null;
  this.happybar= null;
  this.tileHits = null;
  this.plotting = false;
  this.dialogBool=false;
  this.wantsToCall=false;
  this.boolean_clicked=false;
  this.phoneBool=false;
  this.reminded=false;
  this.choicetoggle=false;
  this.dialogCollision1 = null;
  this.dialogCollision2 = null;


    //testing globals using localstorage
    //need to update before leaving this scene
    this.money=Number(sessionStorage.money);
    this.happiness=Number(sessionStorage.happiness);

    this.bgColor='#B4D9E7';
};

Business.Bank.prototype = {
	create: function(){

    this.wk = this.input.keyboard.addKey(Phaser.Keyboard.W);
    this.ak = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sk = this.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dk = this.input.keyboard.addKey(Phaser.Keyboard.D);

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

      //Mr. Krabs' Image
      this.banker1 = this.add.sprite(280,240, 'mrkrabs');
      this.banker1.scale.setTo(0.4,0.4);
      this.dialogCollision1 = this.add.sprite(280,228, 'transparent');
      this.dialogCollision1.scale.setTo(0.2,0.26);
      this.dialogCollision1.enableBody = true;
      this.physics.enable(this.dialogCollision1);
      this.dialogCollision1.body.immovable = true;

      //Diane's Image
      this.banker2 = this.add.sprite(500,350, 'diane');
      this.banker2.scale.setTo(0.2,0.2);
      this.dialogCollision2 = this.add.sprite(500,350, 'transparent');
      this.dialogCollision2.scale.setTo(0.2,0.26);
      this.dialogCollision2.enableBody = true;
      this.physics.enable(this.dialogCollision2);
      this.dialogCollision2.body.immovable = true;
      this.add.tween(this.dialogCollision2).to({ y:300 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      this.add.tween(this.banker2).to({ y:300 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

      this.cursors = this.input.keyboard.createCursorKeys();


      agentbox = this.add.sprite(100, 100, 'rectangle3');
      agentbox.scale.setTo(0.5,0.5);
      agentbox.visible=false;

      var nstyle = { font: "16px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "center" };
      var qstyle = { font: "12px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "left" };

      agentname = this.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/6, "", nstyle);
      agentquote = this.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/2, "", qstyle);
      agentname.anchor.set(0.5);
      agentquote.anchor.set(0.5);
      playerbox = this.add.sprite(300, 100, 'rectangle3');
      playerbox.scale.setTo(0.5,0.5);
      playerbox.visible=false;
      playername = this.add.text(playerbox.x + playerbox.width/2, playerbox.y + playerbox.height/6, "", nstyle);
      playerquote = this.add.text(playerbox.x + playerbox.width/2, playerbox.y + playerbox.height/2, "", qstyle);
      playername.anchor.set(0.5);
      playerquote.anchor.set(0.5);

      this.setUpbankbuttons();
      this.setDialogs(false);
      this.fillDialogueTable();
      this.fillOneLinerTable();

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

   checkCollision1: function(player, portal){
    this.stopMotion(player);
        this.endDialog();
        this.stage.backgroundColor='#B4D9E7';
        sessionStorage.money=Number(money);
        sessionStorage.happiness=Number(happiness);
        this.state.start('Scene1');

  },

  playerCollision: function (player, banker){
      this.stopMotion(player);
      banker.body.drag.setTo(3000);
      dial=this.dialogSelecter(happiness, money);
      bgColor='#992d2d';
      this.dialog();
  },

  playerCollision2: function (player, banker){
      console.log("collision 2!!!")
      this.stopMotion(player);
      banker.body.drag.setTo(3000);
      dial=this.oneLinerSelecter(happiness, money);
      bgColor='#992d2d';
      this.dialog();
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
  stopMotion: function(player){
    this.cursors.up.isDown=false;
    this.cursors.down.isDown=false;
    this.cursors.left.isDown=false;
    this.cursors.right.isDown=false;
    this.wk.isDown=false;
    this.ak.isDown=false;
    this.sk.isDown=false;
    this.dk.isDown=false;
  },

  update: function(){

    if(this.player.x<0){
        this.player.x=0;
    }
    if (this.player.y<0){
        this.player.y=0;
    }
    if (this.player.y>550){
        this.player.y=550;
    }
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
    this.stage.backgroundColor = bgColor;

    this.physics.arcade.collide(this.player, this.layer2);

    this.physics.arcade.overlap(this.player, this.portal, this.checkCollision1, null, this);
    this.physics.arcade.collide(this.player, this.dialogCollision1, this.playerCollision, null, this);
    this.physics.arcade.collide(this.player, this.dialogCollision2, this.playerCollision2, null, this);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

      if (this.cursors.up.isDown || this.wk.isDown)
      {
          this.player.body.velocity.y = -200;
          this.player.animations.stop();
          this.player.frame = 4;
      }
      else if (this.cursors.down.isDown || this.sk.isDown)
      {
          this.player.body.velocity.y = 200;
          this.player.animations.stop();
          this.player.frame = 4;
      }

      if (this.cursors.left.isDown || this.ak.isDown)
      {
          this.player.body.velocity.x = -200;
          this.player.animations.play('left');
      }
      else if (this.cursors.right.isDown || this.dk.isDown)
      {
          this.player.body.velocity.x = 200;
          this.player.animations.play('right');

      }
    else {
       this.player.animations.stop();
    }
  },

  dialog: function (){

    next.visible=true;
    next.input.enabled=true;

    dialogBool=true;
  },
  dialogSelecter: function (hap, mon){
    happ=hap;
    mone=mon;
    if (happ>9){
        happ=9;
    }
    if (mone>9){
        mone=9;
    }
    if (happ<0){
        happ=0;
    }
    if (mone<0){
        mone=0;
        }
    console.log(hap)
    console.log(mon)
    //you can have up to four dialogs
    var x=Math.floor(happ/5);
    var y=Math.floor(mone/5);

    return BankDialog[x][y];
  },

    oneLinerSelecter: function (hap, mon){
      happ=hap;
      mone=mon;
      if (happ>9){
          happ=9;
      }
      if (mone>9){
          mone=9;
      }
      if (happ<0){
        happ=0;
      }
      if (mone<0){
        mone=0;
        }
      //you can have up to four dialogs
      var x=Math.floor(happ/5);
      var y=Math.floor(mone/5);

      return OneLinerDialog[x][y];
  },

  fillOneLinerTable: function (){

      var m="THE MASTER"
      var p = agent_name
      var n1 = m;
      var l1 = "Sometimes random people will send emails to you asking for money.";

      var n2 = p;
      var l2 = "WHOA.";

      var n3 = m;
      var l3 = "They promise to reward you if you pay them a small fee.";

      var n4 = p;
      var l4 = "DON't lie to me!";

      var n5 = m;
      var l5 = "Others may lie and say your family has an emergency and you have to send in money."

      var n6 = p;
      var l6 = "Whoa";

      var n7 = m;
      var l7 = "A common example is the Nigerian Prince scam.";

      var n8 = p;
      var l8 = "I GAVE A NIGERIAN PRINCE my money yesterday!!!";

      var n9 = m;
      var l9 = "MUHAHAHAHA";

      var n10= "money";
      var l10 = "-50";

      var n11 = "end";
      var l11 = "Shouldn't matter";


      var pn1 = m;
      var pl1 = "As you make more money, you should consider ways to invest it.";

      var pn2 = p;
      var pl2 = "Are you scamming me again?";

      var pn3 = m;
      var pl3 = "No, There are many ways you can capitalize on your money!";

      var pn4 = p;
      var pl4 = "I was scammed!";

      var pn5 = m;
      var pl5 = "Not all investments are good ones."

      var pn6 = p;
      var pl6 = "What should I invest in?";

      var pn7 = m;
      var pl7 = "Invest in ventures that not only promise, but demonstrate, good return.";
      
      var pn8 = p;
      var pl8 = "But the Nigerian prince promised a good return";

      var pn9 = m;
      var pl9 = "Do your research. Don't invest blindly.";

      var pn10= p
      var pl10 = "Okay, thanks for the tips";

      var pn11 = "end";
      var pl11 = "Shouldn't matter";

      var poordial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11]];
      var richydial = [[pn1,pl1],[pn2,pl2],[pn3,pl3],[pn4,pl4],[pn5,pl5],[pn6,pl6],[pn7,pl7],[pn8,pl8],[pn9,pl9],[pn10,pl10],[pn11,pl11]];
      var dial00= poordial; 
      var dial01= poordial;
      var dial10=poordial;
      var dial11= richydial;
      OneLinerDialog=[[dial00,dial01],[dial10,dial11]];
  },

  fillDialogueTable: function (){

      var n1 = "Bank Rep";
      var l1 = "Good morning. How may I help you?";

      var n2 = agent_name;
      var l2 = "I want to set up a bank account.";

      var n3 = "Bank Rep";
      var l3 = "Okay. I will open up a checking and savings account.";

      var n4 = agent_name;
      var l4 = "What's a checking and savings account?";

      var n5 = "Bank Rep";
      var l5 = "A checking account helps keep your money safe.";

      var n6 = agent_name;
      var l6 = "Okay.";

      var n7 = "Bank Rep";
      var l7 = "You can easily access your money for daily spendings.";

      var n8 = agent_name;
      var l8 = "How?";

      var n9 = "Bank Rep";
      var l9 = "With a debit card or checks, that we provide.";

      var n10 = agent_name;
      var l10 = "What about a savings account?";

      var n11 = "Bank Rep";
      var l11 = "Saving accounts save your money for the future";

      var n12 = agent_name;
      var l12 = "Okay...";

      var n13 = "Bank Rep";
      var l13 = "They reward you with interest for the money you save.";

      var n14 = agent_name;
      var l14 = "I see.";

      var n15 = "Bank Rep";
      var l15 = "Shall we get started?";

      var n16 = agent_name;
      var l16 = "Yes!";

      var n17 = "Bank Rep";
      var l17 = "Okay, first I need your opening deposit.";

      var n18 = agent_name;
      var l18 = "Here it is.";

      var n19 = "Bank Rep";
      var l19 = "Thanks. Are you aware of our services and fees?";

      var n20 = agent_name;
      var l20 = "Yes, my agent went through everything with me.";

      var n21 = "Bank Rep";
      var l21 = "Perfect. Let me process everything right now.";

      var n22 = agent_name;
      var l22 = "Awesome!";

      var n23 = "Bank Rep";
      var l23 = "Congratulations, your account has been created.";

      var n24 = agent_name;
      var l24 = "Thank you so much!";

      var n25 = "end";
      var l25 = "Shouldn't matter";

      var richdial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11],[n12,l12],[n13,l13],[n14,l14],[n15,l15],[n16,l16],[n17,l17],[n18,l18],[n19,l19],[n20,l20],[n21,l21],[n22,l22],[n23,l23],[n24,l24], [n25,l25]];
      var dial00= richdial; 
      var dial01= richdial;
      var dial10= richdial;
      var dial11= richdial;
      BankDialog=[[dial00,dial01],[dial10,dial11]];
  },
  decisionPoint: function (){

    texts[0].text=dial[currentStep][1];
    texts[1].text= dial[currentStep+1][1];
    texts[2].text= dial[currentStep+2][1];
    texts[3].text= dial[currentStep+3][1];
    this.setDialogs(true);
  },

  clearAndJump: function (i){
      storage=-1;
      for (var x=currentStep;x<dial.length;x++){
  
          var y=parseInt(dial[x][0]);
          if (y==i){
              storage=x+1;
          }
      }
      if (storage==-1){
          alert("There was no further dialog for that option");
          Business.HomeScene.prototype.endDialog();
      }
      else{
          return storage;
         //Business.HomeScene.prototype.dialog(dial, storage);
      }
   },

  endDialog: function (){
    console.log("ran")
    bgColor='#B4D9E7';
    this.currentStep=0;
        //Business.HomeScene.prototype.setbackGroundColor('#000000'); 
        return;
  },

  showPopUp: function(text){

    var choice1 = "Minimum Opening Deposit:$50\nMonthly Service Fee: $10\nService fee can be avoided by:\n  10 debit card purchases/payments\n  Qualifying total direct deposits of $500\n  Maintain a $1,500 minimum daily balance\nZero Liability Protection\nInterest Rate: 0.01%";
    var choice2 = "Minimum Opening Deposit:$500\nMonthly Service Fee: $0\nComplementary Overdraft Protection\nZero Liability Protection\nDebit Card Chip Technology\nInterest Rate: 0.03%\nMobile Banking";
    var choice3 = "Minimum Opening Deposit:$100\nMonthly Service Fee: $12\nService fee can be avoided by:\n  Student under 23 years old\n  At least one qualifying direct deposit of $250\n  Maintain a $1,500 minimum daily balance\nMobile Banking\nSecure Transfers\nInterest Rate: 0.01%";
    var choice4 = "Minimum Opening Deposit:$25\nMonthly Service Fee: $12\nService fee can be avoided by:\n  Direct deposits totaling $500\n  Average daily balance of $5,000 or more\n  Maintain a $1,500 minimum daily balance\nDebit Card Chip Technology\nAccount Alerts and Overdraft Protection\nInterest Rate: 0.01%";
    popup.visible=true;
    popuptext.visible=true;

    if (text=="Wells Fargo"){
      popuptext.text=choice1;
    }

    else if (text=="BestBank"){
      popuptext.text=choice2;
    }

    else if (text=="Bank of Am."){
      popuptext.text=choice3;
    }

    else if (text=="Chase Bank"){
      popuptext.text=choice4;
    }   

  },

  setDialogs: function(bool) {
    for(var i=0; i<4; i++) {
        bankbuttons[i].input.enabled = bool;
        bankbuttons[i].visible = bool;
    }
  },

  setUpbankbuttons: function(){
      //next = this.add.button(10, 250, "arrow");

    //next = this.add.button(10, 250, "arrow");
      next = this.add.button(0, 0, "transparent");
      next.scale.setTo(100,100);

      next.visible=false;
      next.input.enabled=false; 
      

      bankbuttons=[];
      texts=[];
      texts.push(this.add.text(100,40,' '));
      bankbuttons.push(this.add.button(40,40,'box'));
      texts.push(this.add.text(100,80,' '));
      bankbuttons.push(this.add.button(40,80,'box'));
      texts.push(this.add.text(100,120,' '));
      bankbuttons.push(this.add.button(40,120,'box'));
      texts.push(this.add.text(100,160,' '));
      bankbuttons.push(this.add.button(40,160,'box'));
    
      texts[0].inputEnabled=true;
      texts[0].events.onInputDown.add(function() {
        if (texts[0].text.length>3){
            Business.HomeScene.prototype.showPopUp(texts[0].text);
        }
      });
  
      texts[1].inputEnabled=true;
      texts[1].events.onInputDown.add(function() {
        if (texts[1].text.length>3){
            Business.HomeScene.prototype.showPopUp(texts[1].text);
        }
       });
    
      texts[2].inputEnabled=true;
      texts[2].events.onInputDown.add(function() {
        if (texts[2].text.length>3){
            Business.HomeScene.prototype.showPopUp(texts[2].text);
        }
       });
  
      texts[3].inputEnabled=true;
      texts[3].events.onInputDown.add(function() {
        if (texts[3].text.length>3){
            Business.HomeScene.prototype.showPopUp(texts[3].text);
        }
      });
  
  
      bankbuttons[0].onInputDown.add(function() {
        currentStep= Business.HomeScene.prototype.clearAndJump(1);
        Business.HomeScene.prototype.clearChoices()
        Business.HomeScene.prototype.dialog();
      });
  
      bankbuttons[1].onInputDown.add(function() {
        currentStep= Business.HomeScene.prototype.clearAndJump(2);
        Business.HomeScene.prototype.clearChoices()
        Business.HomeScene.prototype.dialog();
      });
    
      bankbuttons[2].onInputDown.add(function() {
        currentStep= Business.HomeScene.prototype.clearAndJump(3);
        Business.HomeScene.prototype.clearChoices()
        Business.HomeScene.prototype.dialog();
      });
    
      bankbuttons[3].onInputDown.add(function() {
        currentStep= Business.HomeScene.prototype.clearAndJump(4);
        Business.HomeScene.prototype.clearChoices()
        Business.HomeScene.prototype.dialog();
      });
    
  
      next.onInputUp.add(function(){
        agentbox.visible = true;
        playerbox.visible=true;
        agentname.text=dial[0][0];
        playername.text=dial[1][0];
    
        if (dial[currentStep][0]=="happy"){
            happyReader=parseInt(dial[currentStep][1]);
            happiness=happiness+happyReader;
            currentStep++;
            Business.HomeScene.prototype.dialog();
        }
    
        if (dial[currentStep][0]=="money"){
            moneyReader=parseInt(dial[currentStep][1]);
            money=money+moneyReader;
            currentStep++;
            Business.HomeScene.prototype.dialog();
        }
    
        if (dial[currentStep][0]=="end") {
            agentbox.visible=false
            agentname.visible=false;
            playerbox.visible=false;
            playername.visible=false;
            playerquote.visible = false;
            agentquote.visible=false;
            currentStep=0;
            this.dialogBool=false;
    
            next.visible=false;
            next.input.enabled=false;
            Business.HomeScene.prototype.endDialog();
        }
    
        else if (dial[currentStep][0]=="Choice") {
            next.kill();
            agentbox.visible=false
            agentname.visible=false;
            playerbox.visible=false;
            playername.visible=false;
            playerquote.visible = false;
            agentquote.visible=false;
            Business.HomeScene.prototype.decisionPoint();
        }
    
        else if (currentStep%2==0){ 
          //agent speaking
          agentbox.visible=true;
          agentname.visible=true;
          agentquote.visible=true;
    
          playerbox.visible=false;
          playername.visible=false;
          playerquote.visible = false;
    
          playerquote.text="";
          agentquote.text =dial[currentStep][1];
          currentStep=currentStep+1;
        }  
        else{
          //player speaking
          playerbox.visible=true;
          playername.visible=true;
          playerquote.visible = true;
    
          agentbox.visible=false;
          agentname.visible=false;
          agentquote.visible=false;
          agentquote.text="";
          playerquote.text =dial[currentStep][1];
          currentStep=currentStep+1;
        }
      });
  }
  
};
