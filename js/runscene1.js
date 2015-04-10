    var game = new Phaser.Game(550, 400, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.tilemap('map', 'assets/tilemaps/maps/gymphaser.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('pokemontileset', 'assets/tilemaps/tiles/pokemontileset.png');
        game.load.image('masstileset', 'assets/tilemaps/tiles/masstileset.png');
        game.load.image('gymset', 'assets/tilemaps/tiles/gymset.png');
        game.load.image('phaser', 'assets/sprites/phaser-dude.png');
        game.load.image('telephone', 'assets/telephone.png');
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
    }

    function dialog(){
        var  n1=      "Agent";
        var  l1=      "Hi, is this *P* speaking?";

        var   n2=     "Player";
        var   l2=     "Yeah, who is this?";

        var   n3=     "Agent";
        var   l3=     "*P,* hope all is well.  This is *U* from *NAME OF AGENCY*.  We met last week.";

        var   n4=    "Player";
        var   l4=    "Oh, right. Yeah.";

        var   n5=     "Agent";
        var   l5=     "As I said last week, I’d love to bring you on as part of the *NAME OF AGENCY family.";

        var   n6=     "Player";
        var   l6=     "My family and I really liked your proposal.";

        var   n7=     "Agent";
        var   l7=     "Let’s meet this week.  I can get to *CITY OF PERSON* tomorrow.";

        var   n8=     "Player";
        var   l8=     "Tomorrow afternoon works for my family and me.";

        var   n9=     "Agent";
        var   l9=     "Great, I’ll book a conference room at my partner’s office for 3pm. I’ll see you tomorrow!";

        var dial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9]];
    //  The two sprites are colliding

    var index=0;
    
    var name = game.add.text(100,30, ""); 
    var label = game.add.text(100,100, "");
    var next = game.add.button(100,300, "arrow"); 
    next.inputEnabled=true;
    next.onInputUp.add(function(){
        name.text=dial[index][0];
        label.text =dial[index][1];
        index=index+1;

    });
    dialogBool=true;



}
function collisionHandler (obj1, obj2) {
    dialog();
    game.stage.backgroundColor = '#992d2d';    
}

function update() {

    game.physics.arcade.collide(sprite, telephone, collisionHandler, null, this);

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