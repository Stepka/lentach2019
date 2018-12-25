
var game;
var boot;
var WIDTH = 960;
var HEIGHT = 540;
var States = {};

game = new Phaser.Game(
    Game = {
        width: WIDTH,
        height: HEIGHT,
        renderer: Phaser.AUTO,
        parent: "game_container",
        transparent: false,
        antialias: true,
        physicsConfig: null,
        preserveDrawingBuffer: true,

        preload: function () {
        },

        create: function () {
        }
    }
);

var startMiniGame = function() {
    console.log("start mini game");
    game.state.add('SlutSky', States.SlutSky);
    game.state.start("SlutSky", true);
};


States.Boot = function(game) {
};


States.Boot.prototype = {

    preload: function () {
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.stage.backgroundColor = 15198183;
        this.game.load.atlas("preloader", "assets/images/common/lprelouder.png", "assets/images/common/lprelouder.json");
    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

        console.log("Boot state load: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        if (progress >= 100) {
            this.game.load.onFileComplete.removeAll();
            this.game.state.start("Preload", true);
        }

    }
};


States.Preload = function(game) {
    var _logo ;
    var _logo2 ;
    var _logo3 ;
    var _logo4 ;
    var _footer ;
    var _loading ;
    var _logoContainer ;
    var _loadingMask ;
};


States.Preload.prototype = {

    preload: function () {

        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.game.stage.backgroundColor = 15198183;
        this._logoContainer = this.make.sprite(this.world.centerX, this.world.centerY);
        this.add.existing(this._logoContainer);
        this._logo = this.make.image(0, -80, "preloader", "logo1");
        this._logo.anchor.set(.5);
        this._logo2 = this.make.image(this._logo.x, this._logo.y + 80, "preloader", "logo2");
        this._logo2.anchor.set(.5);
        this._logo3 = this.make.image(this.world.centerX, this.world.centerY + 2, "preloader", "logo30000");
        this._logo3.anchor.set(.5);
        this.add.existing(this._logo3);
        this._logo3.alpha = 0;
        this._logo4 = this.make.image(this._logo3.x, this._logo3.y - 34, "preloader", "logo40000");
        this._logo4.anchor.set(.5);
        this.add.existing(this._logo4);
        this._logo4.alpha = 0;
        this._footer = this.make.image(this._logo.x, this._logo.y + 85 + 80, "preloader", "bg0000");
        this._footer.anchor.set(.5);
        this._loading = this.make.image(this._logo.x, this._logo.y + 85 + 80, "preloader", "fg0000");
        this._loading.anchor.set(.5);
        this._logoContainer.addChild(this._logo);
        this._logoContainer.addChild(this._logo2);
        this._logoContainer.addChild(this._footer);
        this._logoContainer.addChild(this._loading);
        var arrowBoxWidth = this._loading.width + 4;
        var cpuHeight = this._loading.height + 2;
        this._loadingMask = this.make.graphics(.5 * -arrowBoxWidth, 0);
        this._loadingMask.beginFill(16711680, .5);
        this._loadingMask.drawRect(0, .5 * -cpuHeight, arrowBoxWidth, cpuHeight);
        this._loadingMask.endFill();
        this._loading.addChild(this._loadingMask);
        this._loading.mask = this._loadingMask;
        this._loadingMask.scale.x = 0;

        // load assets
        this.game.load.image('button_back', 'assets/images/common/button.png');

        // slutsky
        game.load.image('bg', 'assets/images/slutsky/bg.png');
        game.load.image('shadow_man', 'assets/images/slutsky/man.png');
        game.load.image('shadow_woman', 'assets/images/slutsky/woman.png');
        game.load.image('get_out', 'assets/images/slutsky/bam.png');
        game.load.atlasXML('slutsky', 'assets/images/slutsky/animation/slutsky.png', 'assets/images/slutsky/animation/slutsky.xml');
        game.load.atlasXML('arm_right', 'assets/images/slutsky/animation/arm_right.png', 'assets/images/slutsky/animation/arm.xml');
        game.load.atlasXML('arm_left', 'assets/images/slutsky/animation/arm_left.png', 'assets/images/slutsky/animation/arm.xml');
        game.load.atlasXML('journalist_1', 'assets/images/slutsky/animation/journalist_1.png', 'assets/images/slutsky/animation/journalist_1.xml');
        game.load.atlasXML('journalist_2', 'assets/images/slutsky/animation/journalist_2.png', 'assets/images/slutsky/animation/journalist_2.xml');
        game.load.image('button_back', 'assets/images/slutsky/bttn.png');
        game.load.image('close_button', 'assets/images/slutsky/close.png');
        game.load.image('heart', 'assets/images/slutsky/heart.png');
        game.load.audio('soundtrack', 'assets/sound/slutsky/slutsky.mp3');

        var left = 14;
        this._logo.alpha = 0;
        this._logo.x = -40 - left;
        this.add.tween(this._logo).to({
            alpha : 1
        }, 300, null, true, 100);
        this.add.tween(this._logo).to({
            x : -left
        }, 400, Phaser.Easing.Back.Out, true, 100);
        left = left + 1;
        this._logo2.alpha = 0;
        this._logo2.x = 40 + left;
        this.add.tween(this._logo2).to({
            alpha : 1
        }, 300, null, true, 100);
        this.add.tween(this._logo2).to({
            x : left
        }, 400, Phaser.Easing.Back.Out, true, 100);
    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

        console.log("Preload state load: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        if (progress >= 100) {
            this.game.load.onFileComplete.removeAll();

            var self = this;
            this.add.tween(this._logoContainer).to({
                alpha : 0
            }, 450, null, true, 300).onComplete.addOnce(function() {
                self.startGame();
            });
        }
    },

    startGame: function() {
        var reply = this;
        setTimeout(function() {
            reply.game.state.start("Menu", true);
        }, 301);
    }
};


States.Menu = function(game) {
};


States.Menu.prototype = {

    preload: function () {

        // this.game.load.onLoadStart.add(this.loadStart, this);
        // this.game.load.onFileComplete.add(this.fileComplete, this);
        // this.game.load.onLoadComplete.add(this.loadComplete, this);
    },

    create: function () {
        var menuGroup = this.game.add.group();
        var button;
        var i;
        for (i = 0; i < 6; i++) {
            button = new LabelButton(this.game, 0, 0, "button_back", "Игра " + (i+1), this.onMenuItemTap, this, 0, 0, 0);
            button.index = i;
            menuGroup.add(button);
        }

        //  Try changing the position constant to see the difference:
        menuGroup.align(3, 2, WIDTH/3, HEIGHT/2, Phaser.CENTER);
    },

    update: function () {
    },

    onMenuItemTap: function(button) {
        console.log("start game " + (button.index+1));

        if(button.index == 0) {
            this.game.destroy();
            // window.location.replace("telegram.html");
            loadScript("src/tg.js", startMiniGame);
        } else if(button.index == 1) {
            console.log(this)
            // this.game.destroy();
            // window.location.replace("slutsky.html");
            loadScript("src/SlutSky.js", startMiniGame);
        } else if(button.index == 2) {

        } else if(button.index == 3) {
            this.game.destroy();
            // window.location.replace("pension.html");
            loadScript("src/pension.js", startMiniGame);
        } else if(button.index == 4) {

        } else if(button.index == 5) {

        }
    },

    // loadStart: function() {
    //
    //     console.log("Loading ...");
    //
    // },
    //
    // fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
    //
    //     console.log("Game state load: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    //     this._loadingMask.scale.x = progress / 100;
    //     if (progress >= 100) {
    //         this.game.load.onFileComplete.removeAll();
    //     }
    //
    // },
    //
    // loadComplete: function() {
    //
    //     console.log("Load Complete");
    //
    // }
};

game.state.add('Boot', States.Boot);
game.state.add('Preload', States.Preload);
game.state.add('Menu', States.Menu);

game.state.start('Boot');

window.onload = function() {
    setTimeout("window.scrollTo(0, 1)", 10);
    document.body.addEventListener("touchmove", function(event) {
        event.preventDefault();
    }, false);
};

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var LabelButton = function(game, x, y, key, label, callback,
                           callbackContext, overFrame, outFrame, downFrame, upFrame)
{
    Phaser.Button.call(this, game, x, y, key, callback,
        callbackContext, overFrame, outFrame, downFrame, upFrame);
    //Style how you wish...
    this.style = { font: "60px HelveticaNeue", fill: "#FFEEDE", align: "center", boundsAlignH: "center", boundsAlignV: "middle" };
    this.anchor.setTo( 0.5, 0.5 );
    this.label = new Phaser.Text(game, 0, 0, label, this.style);
    //puts the label in the center of the button
    this.label.anchor.setTo( 0.5, 0.5 );
    this.addChild(this.label);
    this.setLabel( label );
    //adds button to game
    // game.add.existing( this );

    return this;
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;
LabelButton.prototype.setLabel = function( label )
{
    this.label.setText(label);
};