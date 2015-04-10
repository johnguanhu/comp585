    var game = new Phaser.Game(550, 400, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.tilemap('map', 'assets/tilemaps/maps/gymphaser.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('pokemontileset', 'assets/tilemaps/tiles/pokemontileset.png');
        game.load.image('masstileset', 'assets/tilemaps/tiles/masstileset.png');
        game.load.image('gymset', 'assets/tilemaps/tiles/gymset.png');
        game.load.image('phaser', 'assets/sprites/phaser-dude.png');
        game.load.image('telephone', 'assets/telephone.png');
        game.load.image('rectangle', 'assets/rectangle.png');
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
    //  The two sprites are colliding

    var index=0;


    // var graphics = game.add.graphics(100, 100);
    // graphics.lineStyle(0);
    // graphics.beginFill(0xFFFFF, 0.5);
    // var circle=graphics.drawCircle(300, 100, 100);
    // graphics.endFill();

    //create tangle
    var dbox = game.add.sprite(100, 100, 'rectangle');
    dbox.scale.setTo(0.5,0.5);
    dbox.visible = false;

    var name = game.add.text(110,110, "", { font: "18px Arial"}); 
    var label= game.add.text(220, 150, "", { font: "14px Arial", align: "left", wordWrap: true, wordWrapWidth: 220});
    label.anchor.set(0.5);

    //var text = game.add.text(100, 100, "Text", { font: "25px Arial", align: "center" }, group);
    // var txt = game.add.text(game.world.centerX, game.world.centerY, "My Text");
    // txt.anchor.set(0.5, 0.5);
    
    var next = game.add.button(100,300, "arrow"); 
    next.inputEnabled=true;
    next.onInputUp.add(function(){
        dbox.visible = true;
        name.text=dial[index][0];
        label.text =dial[index][1];
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