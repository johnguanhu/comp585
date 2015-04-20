    var game = new Phaser.Game(550, 400, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.tilemap('map', 'assets/tilemaps/maps/gymphaser.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('pokemontileset', 'assets/tilemaps/tiles/pokemontileset.png');
        game.load.image('masstileset', 'assets/tilemaps/tiles/masstileset.png');
        game.load.image('gymset', 'assets/tilemaps/tiles/gymset.png');
        game.load.image('phaser', 'assets/sprites/phaser-dude.png');
        game.load.image('telephone', 'assets/telephone.png');
        game.load.image('rectangle', 'assets/rectangle.png');
        game.load.image('rectangle3', 'assets/tangle3.png');
        game.load.image('wallet', 'assets/wallet.png');
    }

    var map;
    var layer1, layer2, layer3;
    var cursors;
    var sprite;
    var line;
    var tileHits = [];
    var plotting = false;
    var index=0;
    var dialogBool=false;
    var dial;
    var wantsToCall=false;
    var player_name = "STUD"
    var boolean_clicked=false;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);


        line = new Phaser.Line();

        map = game.add.tilemap('map');

        map.addTilesetImage('masstileset');
        map.addTilesetImage('pokemontileset');
        map.addTilesetImage('gymset');

        layer1 = map.createLayer('backgroundLayer');
        layer2 = map.createLayer('blockedLayer');

        layer1.resizeWorld();

        map.setCollisionBetween(1, 100000, true, layer2);

        layer1.debug = true;
        telephone= game.add.sprite(210,0, 'telephone')
        telephone.scale.setTo(0.04,0.04);

        sprite = game.add.sprite(130, 150, 'phaser');
        sprite.scale.setTo(0.75,0.75);

        game.physics.enable(sprite);
        game.physics.enable(telephone)
        game.camera.follow(sprite);
        cursors = game.input.keyboard.createCursorKeys();

        telephone.enableBody = true;
        telephone.body.immovable=true;

        agent_name= prompt("What is the your name");

        var BusinessTips = game.add.button(400,310, "wallet"); 
        BusinessTips.scale.setTo(.3,.3);
        BusinessTips.inputEnabled=true;
        tips = game.add.sprite(200, 200, 'rectangle3');
        tipword=game.add.text(tips.x, tips.y , "Tips go here");
        tips.scale.setTo(0.5,0.5);
        tips.visible=false;
        tipword.visible=false;

        BusinessTips.onInputDown.add(function(){
            if (boolean_clicked){
                tipword.visible=false;
                tips.visible=false;
                boolean_clicked=false;
            }
            else {
                tipword.visible=true;
                tips.visible=true;
                boolean_clicked=true}
        })
      
        //on click move through the dialog
    }

    function dialog(){
        var p=player_name;
        var a=agent_name;
        var name_agency="FUN AGENTS LMT"

        var   l1=      "Hi, is this " + player_name + " speaking?";
        var   l2=     "Yeah, who is this?";
        var   l3=     player_name + ", hope all is well.  This is " + agent_name +" from " +name_agency+".  We met last week.";
        var   l4=    "Oh, right. Yeah.";
        var   l5=     "As I said last week, I’d love to bring you on as part of the " +name_agency+" family.";
        var   l6=     "My family and I really liked your proposal.";
        var   l7=     "Let’s meet this week.  I can get to *CITY OF PERSON* tomorrow.";
        var   l8=     "Tomorrow afternoon works for my family and me.";
        var   l9=     "Great, I’ll book a conference room at my partner’s office for 3pm. I’ll see you tomorrow!";

        var dial=[[a,l1],[p,l2],[a,l3],[p,l4],[a,l5],[p,l6],[a,l7],[p,l8],[a,l9]];

    var index=0;

    agentbox = game.add.sprite(100, 100, 'rectangle3');
    agentbox.scale.setTo(0.5,0.5);
    agentbox.visible=false;

    var nstyle = { font: "16px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "center" };
    var qstyle = { font: "12px Arial", fill: "black", wordWrap: true, wordWrapWidth: agentbox.width, align: "left" };

    var agentname = game.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/6, "", nstyle);
    var agentquote = game.add.text(agentbox.x + agentbox.width/2, agentbox.y + agentbox.height/2, "", qstyle);
    agentname.anchor.set(0.5);
    agentquote.anchor.set(0.5);

   

    playerbox = game.add.sprite(300, 100, 'rectangle3');
    playerbox.scale.setTo(0.5,0.5);
    playerbox.visible=false;
    var playername = game.add.text(playerbox.x + playerbox.width/2, playerbox.y + playerbox.height/6, "", nstyle);
    var playerquote = game.add.text(playerbox.x + playerbox.width/2, playerbox.y + playerbox.height/2, "", qstyle);
    playername.anchor.set(0.5);
    playerquote.anchor.set(0.5);
    
    var next = game.add.button(100,300, "arrow"); 
    next.inputEnabled=true;

    next.onInputUp.add(function(){
        agentbox.visible = true;
        playerbox.visible=true;
        agentname.text=dial[0][0];
        playername.text=dial[1][0];

        if (index%2==0){ 
            playerquote.text="";
            agentquote.text =dial[index][1];
        }
        else{
            agentquote.text="";
            playerquote.text =dial[index][1];
        }
        index=index+1;

    });
    dialogBool=true;
}

function checkCollision(obj1, obj2){
    if (!wantsToCall && confirm("Would you like to call " + player_name))  {
        wantsToCall=true;
        collisionHandler();
    }
}
function collisionHandler (obj1, obj2) {
    dialog();
    game.stage.backgroundColor = '#992d2d';    
}

function update() {

    game.physics.arcade.collide(sprite, telephone, checkCollision, null, this);

    game.physics.arcade.collide(sprite, layer2);
    game.physics.arcade.collide(sprite, layer3);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }


}

function render() {
    game.debug.geom(line);
}