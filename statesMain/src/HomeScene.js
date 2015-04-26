var map= null;
var layer1= null;
var layer2= null;
var layer3= null;
var cursors= null;
var sprite= null;
var line= null;
var agent_name= null;
var dialTable= null;
var storage= null;
var moneybar= null;
var happybar= null;
var tileHits = null;
var plotting = false;
var dialogBool=false;
var wantsToCall=false;
var player_name = null;
var boolean_clicked=false;
var boolean_paused=false;
var phoneBool=false;
var reminded=false;
var moneyReader=null;
var happiness=0;
var money=0;
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
var buttons = [];
var next;
var reminder;
var remindertext;
var paused;
var bgColor='#d3d3d3';

Business.HomeScene= function(game){
    this.map= null;
    this.layer1= null;
    this.layer2= null;
    this.layer3= null;
    this.cursors= null;
    this.sprite= null;
    this.line= null;
    this.dial= null;
    agent_name= null;
    this.dialTable= null;
    this.storage= null;

    this.happybar= null;
    this.tileHits = null;
    this.plotting = false;
    this.dialogBool=false;
    this.wantsToCall=false;
    player_name = null;
    this.boolean_clicked=false;
    this.phoneBool=false;
    this.reminded=false;
    this.choicetoggle=false;

    this.bgColor='#d3d3d3';
}


Business.HomeScene.prototype = {

    setDialogs: function(bool) {
        for(var i=0; i<4; i++) {
            buttons[i].input.enabled = bool;
            buttons[i].visible = bool;
        }
    },
    create: function() {  //    tipword=this.add.text(tips.x, tips.y , "Tips go here");
        this.physics.startSystem(Phaser.Physics.ARCADE);
        rgChoice = 1;
        this.map = this.add.tilemap('scene2');

        this.map.addTilesetImage('masstileset');
        this.map.addTilesetImage('pokemontileset');
        this.map.addTilesetImage('gymset');

        this.layer1 = this.map.createLayer('backgroundLayer');
        this.layer2 = this.map.createLayer('blockedLayer');

        this.layer1.resizeWorld();

        this.map.setCollisionBetween(1, 100000, true, this.layer2);

        this.layer1.debug = true;
        this.telephone= this.add.sprite(210,100, 'telephone')
        this.telephone.scale.setTo(0.04,0.04);

        this.sprite = this.add.sprite(130, 150, 'dude');
        this.sprite.scale.setTo(0.8,0.8);

        this.physics.enable(this.sprite);
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

        this.physics.enable(this.telephone)
        this.camera.follow(this.sprite);
        this.cursors = this.input.keyboard.createCursorKeys();

        moneyimg=this.add.sprite(10,50, 'money');
        moneylab=this.add.text(60,50,'err');
        happimg=this.add.sprite(10,100,'happy');
        happylab=this.add.text(60,100,'err');
        moneyimg.visible=false;
        moneylab.visible=false;
        happimg.visible=false;
        happylab.visible=false;


    



        next = this.add.button(10, 250, "arrow");
        next.visible=false;
        next.input.enabled=false; 

        texts.push(this.add.text(100,40,' '));
        buttons.push(this.add.button(40,40,'box'));
        texts.push(this.add.text(100,80,' '));
        buttons.push(this.add.button(40,80,'box'));
        texts.push(this.add.text(100,120,' '));
        buttons.push(this.add.button(40,120,'box'));
        texts.push(this.add.text(100,160,' '));
        buttons.push(this.add.button(40,160,'box'))

        // for(var i=0;i<4;i++) {
        //     console.log(i);
        //     buttons[i].onInputDown.add(function() {
        //         console.log("button"+ i +"clicked");
        //         currentStep= Business.HomeScene.prototype.clearAndJump(i+1);
        //         console.log(currentStep);
        //         this.dialog();
        //     });
        // }
        

        buttons[0].onInputDown.add(function() {
            currentStep= Business.HomeScene.prototype.clearAndJump(1);
            Business.HomeScene.prototype.clearChoices()
            Business.HomeScene.prototype.dialog();
        });

        buttons[1].onInputDown.add(function() {
            currentStep= Business.HomeScene.prototype.clearAndJump(2);
            Business.HomeScene.prototype.clearChoices()
            Business.HomeScene.prototype.dialog();
        });

        buttons[2].onInputDown.add(function() {
            currentStep= Business.HomeScene.prototype.clearAndJump(3);
            Business.HomeScene.prototype.clearChoices()
            Business.HomeScene.prototype.dialog();
        });

        buttons[3].onInputDown.add(function() {
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
                this.dialog();
            }

            if (dial[currentStep][0]=="money"){
                moneyReader=parseInt(dial[currentStep][1]);
                money=money+moneyReader;
                currentStep++;
                this.dialog();
            }

            if (dial[currentStep][0]=="end") {
                agentbox.visible=false
                agentname.visible=false;
                playerbox.visible=false;
                playername.visible=false;
                playerquote.visible = false;
                agentquote.visible=false;
                
                this.dialogBool=false;
                
                next.destroy();
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

        this.setDialogs(false);

        this.setUpMoney();
        this.setUpPause();
        this.fillDialogueTable();


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

        //build the reminder stuff
        reminder = this.add.sprite(300, 300, 'rectangle3');
        reminder.scale.setTo(0.5,0.5);
        reminder.visible=false;
        remindertext =this.add.text(reminder.x + reminder.width/2, reminder.y + reminder.height/2, "", qstyle);
        remindertext.anchor.set(0.5);
        remindertext.text="";
        reminder.inputEnabled=true;
        reminder.events.onInputDown.add(function(){
            reminder.visible=false;
            remindertext.visible=false;
        });


        this.telephone.enableBody = true;
        this.telephone.body.immovable=true;

        //agent_name= prompt("What is the your name");
        agent_name="JIM";
        var BusinessTips = this.add.button(5,330, "wallet"); 
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
                this.boolean_clicked=true
                 }
             })
    },
    clearChoices: function(){
        Business.HomeScene.prototype.setDialogs(false);
        texts[0].text="";
        texts[1].text= "";
        texts[2].text= "";
        texts[3].text= "";
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
        //you can have up to four dialogs
        var x=Math.floor(happ/5);
        var y=Math.floor(mone/5);

        return dialTable[x][y];
    },

    fillDialogueTable: function (){
        var  n1=      "Agent";
        var  l1=      "Hi, is this *P* speaking?";

        var   n2=     "Player";
        var   l2=     "Yeah, who is this?";

        var   n3=     "Agent";
        var   l3=     "*P,* hope all is well.  This is *U* from *NAME OF AGENCY*.  We met last week.";

        var   n4=    "Player";
        var   l4=    "Oh, right. Yeah.";

        //example choices - you can saw whatever you want
        //as it stands, needs to be 4 choice options as it will make 4 options
        //if you click second box, it will jump to next instance of "2" in dialogue where 2 is in name slot
        //Then you push to next spot in array (obviously don't print 2/void) and then continues
        //end tag will cause dialogue to end.
         //if you want to increase money or happiness in dialogue, if the name of the speaker is money & text is a number, it shoudl increment or decrement happiness by specific amount.

         var   n5=     "Choice";
         var   l5=     "1";

         var   n6=     "Choice";
         var   l6=     "2";

         var   n7=     "Choice";
         var   l7=     "3";

         var   n8=     "Choice";
         var   l8=     "4";

         var   n9=       "2";
         var   l9=       "void";

         var   n10=     "Player";
         var   l10=     "You picked 2";


         var   n11=     "";
         var   l11=      "";

         var   n12=     "end";
         var   l12=      "Shouldn't matter";
         var dial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11],[n12,l12]];
        //end workaround

        //these are clearly placeholders for actual dialog
        var dial00= dial; 
        var dial01= dial;
        var dial10= dial;
        var dial11= dial;
        dialTable=[[dial00,dial01],[dial10,dial11]];
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
       bgColor='#d3d3d3';
       //Business.HomeScene.prototype.setbackGroundColor('#000000'); 

       return;
    },



    //doesn't actually pause anymore, so the timed events will continue
    //probably means we should rename it

    setUpPause: function (){
     var Pause_Label = this.add.button(5,300, "pause"); 

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

    // Add a input listener that can help us return from being paused
    // this.input.onDown.add(this.unpause, self);
},

    phonecall: function (){
        if(!Business.HomeScene.prototype.wantsToCall&&!Business.HomeScene.prototype.reminded){
            Business.HomeScene.prototype.reminded=true;
            reminder.visible=true;
           
            remindertext.text="I need to make a phone call";
          
        
        } 
    },
    setUpMoney: function (){
        moneyUp=this.add.sprite(10,400, 'test');

        moneyUp.inputEnabled=true;
        moneyUp.events.onInputDown.add(function(){
            money=money+1;
            happiness=happiness+1;
        });

        moneybar = this.add.sprite(0,500,'moneyBar');
        moneybar.scale.setTo(.1,.1);

        moneybar.width=money*10;

        happybar = this.add.sprite(0,520,'happyBar');
        happybar.scale.setTo(.1,.1);

        happybar.width=happiness*10;
    },

    checkCollision: function (obj1, obj2){
        if (!this.wantsToCall && confirm("Would you like to call " + player_name)) {
            this.wantsToCall=true;
            this.dialogBool=true;
            this.collisionHandler();
        }
    },
    collisionHandler: function(obj1, obj2) {
        dial=this.dialogSelecter(happiness, money);
        bgColor='#992d2d';
        this.dialog();
    },

    update: function () {

        
            this.stage.backgroundColor = bgColor;



        setInterval(function(){
            Business.HomeScene.prototype.phonecall();
        }, 3000);


        if(moneybar!=null){
            moneybar.width=money*10;
            happybar.width=happiness*10;
            moneylab.text=money.toString();
            happylab.text=happiness.toString();

            // if(moneylab!=null){
            //     moneyimg=this.add.sprite(10,50, 'money');
            //     moneylab=this.add.text(60,50,money.toString());
            //     happimg=this.add.sprite(10,100,'happy');
            //     happylab=this.add.text(60,100,happiness.toString());
            // }

        }

        this.physics.arcade.collide(this.sprite, this.telephone, this.checkCollision, null, this);

        this.physics.arcade.collide(this.sprite, this.layer2);
        this.physics.arcade.collide(this.sprite, this.layer3);

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if (this.cursors.up.isDown)
        {
            this.sprite.body.velocity.y = -200;
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.body.velocity.y = 200;
        }

        if (this.cursors.left.isDown)
        {
            this.sprite.body.velocity.x = -200;
            this.sprite.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.velocity.x = 200;
            this.sprite.animations.play('right');
        }
        else {
            this.sprite.animations.stop();

        }
    }
}