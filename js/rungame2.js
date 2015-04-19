
BusinessGame.rungame2 = function(game) {

    this.tileHits = []; this.plotting = false;

};

BusinessGame.rungame2.prototype = {
    perload: function (){
        this.load.tilemap('map', 'assets/tilemaps/maps/homephaser.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('pokemontileset', 'assets/tilemaps/tiles/pokemontileset.png');
        this.load.image('masstileset', 'assets/tilemaps/tiles/masstileset.png');
        this.load.image('phaser', 'assets/sprites/phaser-dude.png');
    },

    create: function(){
        line = new Phaser.Line();

        map = this.add.tilemap('map');

        map.addTilesetImage('masstileset');
        map.addTilesetImage('pokemontileset');
    
        layer1 = map.createLayer('backgroundLayer');
        layer2 = map.createLayer('blockedLayer');
        layer3 = map.createLayer('collLayer');

        layer1.resizeWorld();

        map.setCollisionBetween(1, 100000, true, layer2);

        layer1.debug = true;

        sprite = this.add.sprite(130, 150, 'phaser');
        sprite.scale.setTo(0.75,0.75);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(onDown, this);

        this.physics.enable(sprite);

        this.camera.follow(sprite);

        cursors = this.input.keyboard.createCursorKeys();

        var help = this.add.text(5, 330, 'Arrows to move, click and drag to cast a ray', { font: '16px Arial', fill: '#ffffff' });
        help.fixedToCamera = true;

        this.input.onDown.add(startLine, this);
        this.input.onUp.add(raycast, this);
        //var mydata = JSON.parse(data);
    },

    update: function(){
        if (plotting)
        {
            line.end.set(this.input.activePointer.worldX, this.input.activePointer.worldY);
        }

        this.physics.arcade.collide(sprite, layer2);
        this.physics.arcade.collide(sprite, layer3);

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

    render: function(){
        this.debug.geom(line);
    },

    switchscene: function() {
        if (sprite.body.x >= this.world.bounds.x){
            this.state.start("scene2");
        }
    },

    onDown: function() {
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

};

