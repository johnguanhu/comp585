var map= null;
var layer1= null;
var layer2= null;
var layer3= null;
var cursors= null;
var sprite= null;
var line= null;
var dial= null;
var agent_name= null;
var dialTable= null;
var storage= null;
var moneybar= null;
var happybar= null;
var tileHits = null;
var plotting = false;
var index=null;
var dialogBool=false;
var wantsToCall=false;
var player_name = null;
var boolean_clicked=false;
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


Business.HomeScene= function(game){
this.map= null;
this.layer1= null;
this.layer2= null;
this.layer3= null;
this.cursors= null;
this.sprite= null;
this.line= null;
this.dial= null;
this.agent_name= null;
this.dialTable= null;
this.storage= null;
this.moneybar= null;
this.happybar= null;
this.tileHits = null;
this.plotting = false;
this.index=null;
this.dialogBool=false;
this.wantsToCall=false;
this.player_name = null;
this.boolean_clicked=false;
this.phoneBool=false;
this.reminded=false;
this.moneyReader=null;
this.happiness=0;
this.money=0;
this.happyReader=null;
this.moneyimg=null;
this.moneylab=null;
this.happyimg=null;
this.happylab=null;
this.a=   null;
this.a1=  null;
this.b=  null;
this.b1=  null;
this.c=  null; 
this.c1= null;
this.d=   null;
this.d1= null;
this.choicetoggle=false;


}


Business.HomeScene.prototype = {

    create: function(){  //    tipword=this.add.text(tips.x, tips.y , "Tips go here");
        this.physics.startSystem(Phaser.Physics.ARCADE);

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




        this.moneyimg=this.add.sprite(10,50, 'money');
        this.moneylab=this.add.text(60,50,'err');
        this.happyimg=this.add.sprite(10,100,'happy');
        this.happylab=this.add.text(60,100,'err');
        this.moneyimg.visible=false;
        this.moneylab.visible=false;
        this.happyimg.visible=false;
        this.happylab.visible=false;

        a=   this.add.text(100,40,' ');
        a1=  this.add.button(40,40,'box');
        b=   this.add.text(100,80,' ');
        b1=  this.add.button(40,80,'box');
        c=   this.add.text(100,120,' ');
        c1=  this.add.button(40,120,'box');
        d=   this.add.text(100,160,' ');
        d1=  this.add.button(40,160,'box');
        a1.visible=false;
        b1.visible=false;
        c1.visible=false;
        d1.visible=false;



        this.setUpMoney();
        this.setUpPause();
        this.fillDialogueTable();
        setInterval(this.phonecall(), 10000);


       

        this.telephone.enableBody = true;
        this.telephone.body.immovable=true;

        this.agent_name= prompt("What is the your name");

        var BusinessTips = this.add.button(400,310, "wallet"); 
        BusinessTips.scale.setTo(.3,.3);
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
                 this.boolean_clicked=true}
             });

        //on click move through the dialog
    },

    dialog: function (dial, index){
        // var p=player_name;
        // var a=agent_name;
        // var name_agency="FUN AGENTS LMT"

        // var   l1=      "Hi, is this " + player_name + " speaking?";
        // var   l2=     "Yeah, who is this?";
        // var   l3=     player_name + ", hope all is well.  This is " + agent_name +" from " +name_agency+".  We met last week.";
        // var   l4=    "Oh, right. Yeah.";
        // var   l5=     "As I said last week, I’d love to bring you on as part of the " +name_agency+" family.";
        // var   l6=     "My family and I really liked your proposal.";
        // var   l7=     "Let’s meet this week.  I can get to *CITY OF PERSON* tomorrow.";
        // var   l8=     "Tomorrow afternoon works for my family and me.";
        // var   l9=     "Great, I’ll book a conference room at my partner’s office for 3pm. I’ll see you tomorrow!";

        // var dial=[[a,l1],[p,l2],[a,l3],[p,l4],[a,l5],[p,l6],[a,l7],[p,l8],[a,l9]];

        // var index=0;

        agentbox = this.add.sprite(100, 100, 'rectangle3');
        agentbox.scale.setTo(0.5,0.5);
        agentbox.visible=false;

        var nstyle = { font: "16px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "center" };
        var qstyle = { font: "12px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "left" };

        var agentname = this.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/6, "", nstyle);
        var agentquote = this.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/2, "", qstyle);
        agentname.anchor.set(0.5);
        agentquote.anchor.set(0.5);



        playerbox = this.add.sprite(300, 100, 'rectangle3');
        playerbox.scale.setTo(0.5,0.5);
        playerbox.visible=false;
        var playername = this.add.text(playerbox.x + playerbox.width/2, playerbox.y + playerbox.height/6, "", nstyle);
        var playerquote = this.add.text(playerbox.x + playerbox.width/2, playerbox.y + playerbox.height/2, "", qstyle);
        playername.anchor.set(0.5);
        playerquote.anchor.set(0.5);

        var next = this.add.button(100,300, "arrow"); 
        next.inputEnabled=true;

        next.onInputUp.add(function(){
            agentbox.visible = true;
            playerbox.visible=true;
            agentname.text=dial[0][0];
            playername.text=dial[1][0];

            if (dial[index][0]=="happy"){
                happyReader=parseInt(dial[index][1]);
                happiness=happiness+happyReader;
                this.dialog(dial,index+1);
            }

            if (dial[index][0]=="money"){
                moneyReader=parseInt(dial[index][1]);
                money=money+moneyReader;
                this.dialog(dial, index+1);
            }

            if (dial[index][0]=="end") {
               console.log("asdsa");
                    agentbox.visible=false
                    agentname.visible=false;
                    playerbox.visible=false;
                    playername.visible=false;
                    playerquote.visible = false;
                    agentquote.visible=false;
                    next.destroy();
                    this.endDialog();
            }

             else if (dial[index][0]=="Choice") {
                    console.log("log");
                    next.kill();
                    agentbox.visible=false
                    agentname.visible=false;
                    playerbox.visible=false;
                    playername.visible=false;
                    playerquote.visible = false;
                    agentquote.visible=false;
                    Business.HomeScene.prototype.decisionPoint(dial, index);
            }
            
            else if (index%2==0){ 
                playerquote.text="";
                agentquote.text =dial[index][1];
            }  
            else{
                agentquote.text="";
                playerquote.text =dial[index][1];
            }

            index=index+1;


              //if hit end destroy all of the parts and run endDialog() 
        //THIS IS BUGGY DOES NOT ACTUALLY DESTROY NEXT
        // well it probably destroys A next, just not all of the nexts
        //well, I fixed it, but I don't know why that fix worked

        });
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

    decisionPoint: function (diag, index){

    //make the parts, long, but couldn't get groups to handle this correctly, will come back to it



        a.text=diag[index][1];
        b.text= diag[index+1][1];
        c.text= diag[index+2][1];
        d.text= diag[index+3][1];


        a1.visible=true;
        b1.visible=true;
        c1.visible=true;
        d1.visible=true;

        a1.inputEnabled=true;
        b1.inputEnabled=true;
        c1.inputEnabled=true;
        d1.inputEnabled=true;
        var choice=[a,b,c,d];

        var stor=0;
    //on click destroy everything and move to the next function 
        a1.onInputDown.add(function(){
      
            a.destroy();
            b.destroy();
            c.destroy();
            d.destroy();
            a1.destroy();
            b1.destroy();
            c1.destroy();
            d1.destroy();
            Business.HomeScene.prototype.clearAndJump(diag,1,index,choice);
        });
        b1.onInputDown.add(function(){

            a.destroy();
            b.destroy();
            c.destroy();
            d.destroy();
            a1.destroy();
            b1.destroy();
            c1.destroy();
            d1.destroy();
            Business.HomeScene.prototype.clearAndJump(diag,2,index,choice);
        });
        c1.onInputDown.add(function(){

            a.destroy();
            b.destroy();
            c.destroy();
            d.destroy();
            a1.destroy();
            b1.destroy();
            c1.destroy();
            d1.destroy();
            Business.HomeScene.prototype.clearAndJump(diag,3,index,choice);
        });    
        d1.onInputDown.add(function(){

            a.destroy();
            b.destroy();
            c.destroy();
            d.destroy();
            a1.destroy();
            b1.destroy();
            c1.destroy();
            d1.destroy();
            Business.HomeScene.prototype.clearAndJump(diag,4,index,choice);
        });
    },

    clearAndJump: function (dial, i, index,choice){

        storage=-1;
        for (var x=index;x<dial.length;x++){

            var y=parseInt(dial[x][0]);
            if (y==i){
                storage=x+1;
            }
        }
        if (storage==-1){
            alert("There was no further dialog for that option");
            this.endDialog();
        }
        else{
           Business.HomeScene.prototype.dialog(dial, storage);
        }
    },

    endDialog: function (){
       // dialogBool=false;
       Business.HomeScene.prototype.create.stage.backgroundColor = '#000000';  
       return;
    },

 

    setUpPause: function (){
        pause_label = this.add.text(10, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
        pause_label.inputEnabled = true;
        // checker.inputEnabled=true;
        pause_label.events.onInputUp.add(function () {
            // When the paus button is pressed, we pause the this
            this.paused = true;

            // Then add the menu
            this.moneyimg.visible=true;
            this.moneylab.visible=true;
            this.happyimg.visible=true;
            this.happylab.visible=true;
        });
    
    // Add a input listener that can help us return from being paused
    this.input.onDown.add(this.unpause, self);
    },
    // And finally the method that handels the pause menu
    unpause: function (event){
        // Only act if paused
        if(this.paused){



                // Remove the menu and the label
                this.moneyimg.visible=false;
                this.moneylab.visible=false;
                this.happyimg.visible=false;
                this.happylab.visible=false;
                this.paused = false;
            }
        },


    phonecall: function (){
        if(!this.wantsToCall&&!this.reminded){
            this.reminded=true;
            var agentbox = this.add.sprite(100, 100, 'rectangle3');
            agentbox.scale.setTo(0.5,0.5);
            var nstyle = { font: "16px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "center" };
            var qstyle = { font: "12px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "left" };

            var agentname = this.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/6, "", nstyle);
            var agentquote =this.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/2, "", qstyle);
            agentname.anchor.set(0.5);
            agentquote.anchor.set(0.5);
            agentname.text-this.agent_name;
            agentquote.text="I need to make a phone call";
            agentbox.inputEnabled=true;
            agentbox.events.onInputDown.add(function(){
                agentbox.destroy();
                agentname.destroy();
                agentquote.destroy();
            });
        } 
    },
    setUpMoney: function (){
        moneyUp=this.add.sprite(300,300, 'test');

        moneyUp.inputEnabled=true;
        moneyUp.events.onInputDown.add(function(){
            this.money=this.money+1;
            this.happiness=this.happiness+1;
        });

        moneybar = this.add.sprite(0,350,'moneyBar');
        moneybar.scale.setTo(.1,.1);

        moneybar.width=this.money*10;

        happybar = this.add.sprite(0,370,'happyBar');
        happybar.scale.setTo(.1,.1);

        happybar.width=this.happiness*10;
    },

    checkCollision: function (obj1, obj2){
        if (!this.wantsToCall && confirm("Would you like to call " + this.player_name)) {
            this.wantsToCall=true;
            this.collisionHandler();
        }
    },
    collisionHandler: function(obj1, obj2) {
        var selected=this.dialogSelecter(this.happiness, this.money);
        this.dialog(selected, 0);
        this.stage.backgroundColor = '#992d2d';    
    },

    update: function () {


        if(this.moneybar!=null){
            this.moneybar.width=this.money*10;
            this.happybar.width=this.happiness*10;

            if(this.moneylab!=null){
                this.moneyimg=this.add.sprite(10,50, 'money');
                this.moneylab=this.add.text(60,50,this.money.toString());
                this.happyimg=this.add.sprite(10,100,'happy');
                this.happylab=this.add.text(60,100,this.happiness.toString());
            }

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