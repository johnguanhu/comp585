
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/homephaser.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('pokemontileset', 'assets/tilemaps/tiles/pokemontileset.png');
    game.load.image('masstileset', 'assets/tilemaps/tiles/masstileset.png');
    game.load.image('phaser', 'assets/sprites/phaser-dude.png');

}

var map;
var layer1, layer2, layer3;
var cursors;
var sprite;
var line;
var tileHits = [];
var plotting = false;

function create() {

    line = new Phaser.Line();

    map = game.add.tilemap('map');

    map.addTilesetImage('masstileset');
    map.addTilesetImage('pokemontileset');
    
    layer1 = map.createLayer('backgroundLayer');

    layer2 = map.createLayer('blockedLayer');

    layer1.resizeWorld();
    layer2.resizeWorld();

    map.setCollisionBetween(1, 500);

    layer1.debug = true;

    sprite = game.add.sprite(130, 150, 'phaser');
    sprite.scale.setTo(0.75,0.75);
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(onDown, this);

    game.physics.enable(sprite);

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(5, 330, 'Arrows to move, click and drag to cast a ray', { font: '16px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;

    game.input.onDown.add(startLine, this);
    game.input.onUp.add(raycast, this);
    //var mydata = JSON.parse(data);
    
}

function startLine(pointer) {

    if (tileHits.length > 0)
    {
        for (var i = 0; i < tileHits.length; i++)
        {
            tileHits[i].debug = false;
        }

        layer1.dirty = true;
    }

    line.start.set(pointer.worldX, pointer.worldY);

    plotting = true;

}

function raycast(pointer) {

    line.end.set(pointer.worldX, pointer.worldY);

    tileHits = layer1.getRayCastTiles(line, 4, false, false);

    if (tileHits.length > 0)
    {
        //  Just so we can visually see the tiles
        for (var i = 0; i < tileHits.length; i++)
        {
            tileHits[i].debug = true;
        }

        layer1.dirty = true;
    }

    plotting = false;
    
}

function update() {

    if (plotting)
    {
        line.end.set(game.input.activePointer.worldX, game.input.activePointer.worldY);
    }

    game.physics.arcade.collide(sprite, layer2);

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

function onDown(sprite, pointer) {
     var scene_one= [
        "Hi, is this *P* speaking?",
        "Yeah, who is this?",
        "*P,* hope all is well.  This is *U* from *NAME OF AGENCY*.  We met last week.",
        "Oh, right. Yeah.",
        "As I said last week, I’d love to bring you on as part of the *NAME OF AGENCY famil.",
        "My family and I really liked your proposal.",
        "Let’s meet this week.  I can get to *CITY OF PERSON* tomorrow.",
        "Tomorrow afternoon works for my family and me.",
        "Great, I’ll book a conference room at my partner’s office for 3pm. I’ll see you tomorrow!"
    ];
    for (var i=0; i<scene_one.length; i++){
    alert(scene_one[i]);}
}

function render() {

    game.debug.geom(line);

}
