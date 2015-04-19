

BusinessGame.scene2 = function(game){
    this.map = null;
    this.layer = null;
    this.cursors = null;
    this.sprite = null;
    this.line = null;
    this.titleHits = [];
    this.plotting = false;
};

BusinessGame.rungame2.prototype = {
    perload: function (){
        this.load.tilemap('map', 'assets/tilemaps/maps/homephaser.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
        this.load.image('phaser', 'assets/sprites/phaser-dude.png');
    },
    create: function() {

        line = new Phaser.Line();

        map = this.add.tilemap('map');

        map.addTilesetImage('ground_1x1');
        
        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        map.setCollisionBetween(1, 12);

        layer.debug = true;

        sprite = this.add.sprite(260, 70, 'phaser');

        this.physics.enable(sprite);

        this.camera.follow(sprite);

        cursors = this.input.keyboard.createCursorKeys();

        var help = this.add.text(10, 10, 'Arrows to move, space bar to interact', { font: '16px Arial', fill: '#ffffff' });
        help.fixedToCamera = true;

        this.input.onDown.add(startLine, this);
        this.input.onUp.add(raycast, this);

    },


    update: function() {

        if (plotting)
        {
            line.end.set(this.input.activePointer.worldX, this.input.activePointer.worldY);
        }

        this.physics.arcade.collide(sprite, layer);

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

    },

    render: function() {

        this.debug.geom(line);

    }
};