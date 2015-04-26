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
var buttons = [];
var next;
var reminder;
var remindertext;
var paused;
var wantsToCall=false;
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


    //testing globals using localstorage
    //need to update before leaving this scene
    this.money=Number(sessionStorage.money);
    this.happiness=Number(sessionStorage.happiness);

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
    
    this.money=Number(sessionStorage.money);
    this.happiness=Number(sessionStorage.happiness);

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
        reminder = this.add.sprite(300, 200, 'rectangle3');
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



        popup = this.add.sprite(300, 200, 'rectangle3');
        var popstyle = { font: "14px Arial", fill: "black", wordWrap: true, wordWrapWidth: popup.width, align: "left" };
        popup.visible=false;
        popuptext =this.add.text( popup.x +  popup.width/2,  popup.y +  popup.height/2, "", popstyle);
        popuptext.anchor.set(0.5);
        popuptext.text="";
        popuptext.visible=false;


        popup.inputEnabled=true;
        popup.events.onInputDown.add(function(){
            popup.visible=false;
            popuptext.visible=false;
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

       else if (text=="Bank of America"){
        popuptext.text=choice3;
    }

    else if (text=="Chase Bank"){
       popuptext.text=choice4;
   }


},
fillDialogueTable: function (){

    var n1 = "Agent";
    var l1 = "It’s time to manage your finances.";

    var n2 = "Player";
    var l2 = "Okay, what do I need to do?";

    var n3 = "Agent";
    var l3 = "You need a bank account and credit card.";

    var n4 = "Player";
    var l4 = "Okay, why is that?";

    var n5 = "Agent";
    var l5 = "A bank account helps save and protect your money.";

    var n6 = "Player";
    var l6 = "I see. Why do I need a credit card?";

    var n7 = "Agent";
    var l7 = "It helps you build up good credit.";

    var n8 = "Player";
    var l8 = "What is that?";

    var n9 = "Agent";
    var l9 = "Good credit qualifies you for loans, rent, ...";

    var n10 = "Player";
    var l10 = "And... ?";

    var n11 = "Agent";
    var l11 = "You can make big purchases through payment plans.";

    var n12 = "Player";
    var l12 = "I see. What bank should we go to then?";

    var n13 = "Choice";
    var l13 = "Wells Fargo";

    var n14 = "Choice";
    var l14 = "BestBank";

    var n15 = "Choice";
    var l15 = "Bank of America";

    var n16 = "Choice";
    var l16 = "Chase Bank";

    var n17 = "1"
    var l17 = "void";

    var n18 = "Agent";
    var l18 = "Let's go to Wells Fargo.";

    var n19 = "Player";
    var l19 = "Okay.";

    var n20 = "Agent";
    var l20 = "Great, don’t be late!";

    var n21 = "money";
    var l21 = "-50";

    var n22 = "happy";
    var l22 = "-50";

    var n23 = "end";
    var l23 = "Shouldn't matter";

    var n24 = "2"
    var l24 = "void";

    var n25 = "Agent";
    var l25 = "We should go to BestBank.";

    var n26 = "Player";
    var l26 = "Sounds good.";

    var n27 = "Agent";
    var l27 = "Great, don’t be late!";

    var n28 = "money";
    var l28 = "-500";

    var n29 = "happy";
    var l29 = "+500";

    var n30 = "end";
    var l30 = "Shouldn't matter";

    var n31 = "3"
    var l31 = "void";

    var n32 = "Agent";
    var l32 = "We should go to Bank of America.";

    var n33 = "Player";
    var l33 = "Okay, sounds good.";

    var n34 = "Agent";
    var l34 = "Great, don’t be late!";

    var n35 = "money";
    var l35 = "-100";

    var n36 = "happy";
    var l36 = "-50";

    var n37 = "end";
    var l37 = "Shouldn't matter";

    var n38 = "4"
    var l38 = "void";

    var n39 = "Agent";
    var l39 = "We should go to Chase Bank.";

    var n40 = "Player";
    var l40 = "Okay, sounds good.";

    var n41 = "Agent";
    var l41 = "Great, don’t be late!";

    var n42 = "money";
    var l42 = "-25";

    var n43 = "happy";
    var l43 = "+50";

    var n44 = "end";
    var l44 = "Shouldn't matter";

    var bank_dial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11],[n12,l12],[n13,l13],[n14,l14],[n15,l15],[n16,l16],[n17,l17],[n18,l18],[n19,l19],[n20,l20],[n21,l21],[n22,l22],[n23,l23],[n24,l24],[n25,l25],[n26,l26],[n27,l27],[n28,l28],[n29,l29],[n30,l30],[n31,l31],[n32,l32],[n33,l33],[n34,l34],[n35,l35],[n36,l36],[n37,l37],[n38,l38],[n39,l39],[n40,l40],[n41,l41],[n42,l42],[n43,l43],[n44,l44]];
            //example choices - you can saw whatever you want
        //as it stands, needs to be 4 choice options as it will make 4 options
        //if you click second box, it will jump to next instance of "2" in dialogue where 2 is in name slot
        //Then you push to next spot in array (obviously don't print 2/void) and then continues
        //end tag will cause dialogue to end.
         //if you want to increase money or happiness in dialogue, if the name of the speaker is money & text is a number, it shoudl increment or decrement happiness by specific amount.

         var  n1=      "Agent";
         var  l1=      "Hi, is this *P* speaking?";

         var   n2=     "Player";
         var   l2=     "Yeah, who is this?";

         var   n3=     "Agent";
         var   l3=     "*P,* hope all is well.  This is *U* from *NAME OF AGENCY*.  We met last week.";

         var   n4=    "Player";
         var   l4=    "Oh, right. Yeah.";

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
         var phone_dial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11],[n12,l12]];
        //end workaround

        //these are clearly placeholders for actual dialog
        var dial00= phone_dial; 
        var dial01= phone_dial;
        var dial10= phone_dial; 
        var dial11= bank_dial; 
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
    if(!Business.HomeScene.prototype.wantsToCall&&
        !Business.HomeScene.prototype.reminded){
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
        Business.HomeScene.prototype.reminded=true;
        this.dialogBool=true;
        reminder.visible=false;
        remindertext.text="";
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
    }
    , 3000);


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