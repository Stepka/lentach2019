
var States = {};




States.SlutSky = function(game) {
};


States.SlutSky.prototype = {

        slutsky: null,
        slutsky_hand_left: null,
        slutsky_hand_right: null,
        journalist_left: null,
        journalist_right: null,
        get_out: null,
        get_out_tween: null,

        shadow_man_l_to_r: null,
        shadow_man_r_to_l: null,
        shadow_woman_l_to_r: null,
        shadow_woman_r_to_l: null,


        slutsky_hand_left_tween: null,
        slutsky_hand_right_tween: null,
        shadow_man_l_to_r_tween: null,
        shadow_man_r_to_l_tween: null,
        shadow_woman_l_to_r_tween: null,
        shadow_woman_r_to_l_tween: null,
        journalist_left_tween: null,
        journalist_right_tween: null,


        slutsky_timer: null,


        slutsky_hand_left_tween_outed: null,
        slutsky_hand_right_tween_outed: null,

        game_is_running: null,

        lifes: null,

        lifes_text: null,
        backTimer_text: null,

        gameGroup: null,
        welcomePopup: null,
        winPopup: null,
        losePopup: null,

        backTimer: null,

        style: null,
        closeButton: null,

        soundtrack: null,



        preload: function() {

            // game.load.image('bg', 'assets/images/slutsky/bg.png');
            // game.load.image('shadow_man', 'assets/images/slutsky/man.png');
            // game.load.image('shadow_woman', 'assets/images/slutsky/woman.png');
            // game.load.image('get_out', 'assets/images/slutsky/bam.png');
            // game.load.atlasXML('slutsky', 'assets/images/slutsky/animation/slutsky.png', 'assets/images/slutsky/animation/slutsky.xml');
            // game.load.atlasXML('arm_right', 'assets/images/slutsky/animation/arm_right.png', 'assets/images/slutsky/animation/arm.xml');
            // game.load.atlasXML('arm_left', 'assets/images/slutsky/animation/arm_left.png', 'assets/images/slutsky/animation/arm.xml');
            // game.load.atlasXML('journalist_1', 'assets/images/slutsky/animation/journalist_1.png', 'assets/images/slutsky/animation/journalist_1.xml');
            // game.load.atlasXML('journalist_2', 'assets/images/slutsky/animation/journalist_2.png', 'assets/images/slutsky/animation/journalist_2.xml');
            // game.load.image('button_back', 'assets/images/slutsky/bttn.png');
            // game.load.image('close_button', 'assets/images/slutsky/close.png');
            // game.load.image('heart', 'assets/images/slutsky/heart.png');
            //
            // // game.load.bitmapFont('slut_font', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
            //
            // game.load.audio('soundtrack', 'assets/sound/slutsky/slutsky.mp3');

        },

        create: function() {
            var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'bg');
            bg.anchor.setTo(0.5, 0.5);

            this.gameGroup = game.add.group();

            // slutsky

            var anim;
            this.slutsky = game.add.sprite(game.world.centerX, game.world.centerY, 'slutsky');
            this.slutsky.anchor.setTo(0.5, 0.5);
            anim = this.slutsky.animations.add('give_up', [5, 4, 3, 2, 1, 0], 4, false);
            anim.onComplete.add(this.slutskyGiveUpAnimationComplete, this);
            anim = this.slutsky.animations.add('give_back', [0, 1, 2, 3, 4, 5], 12, false);
            // this.slutsky.animations.play('give_back');
            this.slutsky.frame = 5;
            this.gameGroup.add(this.slutsky);

            // victims

            this.journalist_left = game.add.sprite(game.world.centerX - 120, game.world.centerY + 25, 'journalist_1');
            this.journalist_left.anchor.setTo(0.5, 0.5);
            this.journalist_left.inputEnabled = true;
            this.journalist_left.input.pixelPerfectClick = true;
            this.journalist_left.events.onInputDown.add(this.onLeftKolpakkoving, this);
            this.journalist_left.animations.add('shame', [1, 0], 0.5, false);
            this.gameGroup.add(this.journalist_left);

            this.journalist_right = game.add.sprite(game.world.centerX + 120, game.world.centerY + 25, 'journalist_2');
            this.journalist_right.anchor.setTo(0.5, 0.5);
            this.journalist_right.inputEnabled = true;
            this.journalist_right.input.pixelPerfectClick = true;
            this.journalist_right.events.onInputDown.add(this.onRightKolpakkoving, this);
            this.journalist_right.animations.add('shame', [1, 0], 0.5, false);
            this.gameGroup.add(this.journalist_right);

            // hands

            this.slutsky_hand_left = game.add.sprite(0, game.world.centerY, 'arm_left');
            this.slutsky_hand_left.anchor.setTo(0, 0.5);
            this.slutsky_hand_left.x = -this.slutsky_hand_left.width;
            this.slutsky_hand_left.inputEnabled = true;
            this.slutsky_hand_left.input.pixelPerfectClick = true;
            this.slutsky_hand_left.events.onInputDown.add(this.onSlutskyLeftSpank, this);
            this.slutsky_hand_left.animations.add('spank', [0, 1, 0, 1, 0], 8, false);
            this.gameGroup.add(this.slutsky_hand_left);

            this.slutsky_hand_right = game.add.sprite(game.world.width, game.world.centerY, 'arm_right');
            this.slutsky_hand_right.anchor.setTo(1, 0.5);
            this.slutsky_hand_right.x = game.world.width + this.slutsky_hand_right.width;
            this.slutsky_hand_right.inputEnabled = true;
            this.slutsky_hand_right.input.pixelPerfectClick = true;
            this.slutsky_hand_right.events.onInputDown.add(this.onSlutskyRightSpank, this);
            this.slutsky_hand_right.animations.add('spank', [0, 1, 0, 1, 0], 8, false);
            this.gameGroup.add(this.slutsky_hand_right);

            // peoples

            this.shadow_man_l_to_r = game.add.sprite(-200, game.world.height + 100, 'shadow_man');
            this.shadow_man_l_to_r.anchor.setTo(0.5, 1);
            this.shadow_man_l_to_r.scale.setTo(0.75, 0.75);
            this.shadow_man_l_to_r.inputEnabled = true;
            this.shadow_man_l_to_r.input.pixelPerfectClick = true;
            this.gameGroup.add(this.shadow_man_l_to_r);

            this.shadow_man_r_to_l = game.add.sprite(game.world.width + 200, game.world.height + 100, 'shadow_man');
            this.shadow_man_r_to_l.anchor.setTo(0.5, 1);
            this.shadow_man_r_to_l.scale.setTo(-0.75, 0.75);
            this.shadow_man_r_to_l.inputEnabled = true;
            this.shadow_man_r_to_l.input.pixelPerfectClick = true;
            this.gameGroup.add(this.shadow_man_r_to_l);

            this.shadow_woman_l_to_r = game.add.sprite(-200, game.world.height + 100, 'shadow_woman');
            this.shadow_woman_l_to_r.anchor.setTo(0.5, 1);
            this.shadow_woman_l_to_r.scale.setTo(-0.75, 0.75);
            this.shadow_woman_l_to_r.inputEnabled = true;
            this.shadow_woman_l_to_r.input.pixelPerfectClick = true;
            this.gameGroup.add(this.shadow_woman_l_to_r);

            this.shadow_woman_r_to_l = game.add.sprite(game.world.width + 200, game.world.height + 100, 'shadow_woman');
            this.shadow_woman_r_to_l.anchor.setTo(0.5, 1);
            this.shadow_woman_r_to_l.scale.setTo(0.75, 0.75);
            this.shadow_woman_r_to_l.inputEnabled = true;
            this.shadow_woman_r_to_l.input.pixelPerfectClick = true;
            this.gameGroup.add(this.shadow_woman_r_to_l);

            // get out

            this.get_out = game.add.sprite(-200, -200, 'get_out');
            this.get_out.anchor.setTo(0.5, 0.5);

            // labels

            this.style = { font: "80px HelveticaNeue", fill: "#FFEEDE", align: "center", boundsAlignH: "center", boundsAlignV: "middle" };

            var lifes_text_group = game.add.group();
            var heart = game.add.sprite(0, 0, 'heart');
            this.lifes_text = game.add.text(0, 0, "", this.style);
            this.lifes_text.anchor.set(0.5);
            lifes_text_group.add(heart);
            lifes_text_group.add(this.lifes_text);
            lifes_text_group.align(2, 1, heart.width, heart.height, Phaser.CENTER);
            lifes_text_group.y = 10;
            lifes_text_group.x = game.world.width - heart.width*2;
            this.gameGroup.add(lifes_text_group);


            this.backTimer_text = game.add.text(2, -10, "", this.style);
            // this.backTimer_text.anchor.set(0.5);
            this.gameGroup.add(this.backTimer_text);

            // welcomePopup

            this.welcomePopup = game.add.group();
            this.welcomePopup.inputEnabled = true;
            var welcome_text = game.make.text(0, 0, "ПОЕХАЛИ!", this.style);
            var btnWelcomeStart = new LabelButton(this.game, 0, 0, "button_back", "играть", this.onPopupTap, this, 0, 0, 0);
            this.welcomePopup.add(welcome_text);
            this.welcomePopup.add(btnWelcomeStart);
            this.welcomePopup.align(1, 2, game.world.width, game.world.height/4, Phaser.CENTER);
            this.welcomePopup.y = game.world.centerY - this.welcomePopup.height/2;

            // winPopup

            this.winPopup = game.add.group();
            this.winPopup.inputEnabled = true;
            var win_text = game.make.text(0, 0, "ТЫ ВЫИГРАЛ!", this.style);
            var btnWinStart = new LabelButton(this.game, 0, 0, "button_back", "еще раз", this.onPopupTap, this, 0, 0, 0);
            this.winPopup.add(win_text);
            this.winPopup.add(btnWinStart);
            this.winPopup.align(1, 2, game.world.width, game.world.height/4, Phaser.CENTER);
            this.winPopup.y = game.world.centerY - this.winPopup.height/2;

            // losePopup

            this.losePopup = game.add.group();
            this.losePopup.inputEnabled = true;
            var lose_text = game.make.text(0, 0, "ТЫ ПРОИГРАЛ", this.style);
            var btnLoseStart = new LabelButton(this.game, 0, 0, "button_back", "еще раз", this.onPopupTap, this, 0, 0, 0);
            this.losePopup.add(lose_text);
            this.losePopup.add(btnLoseStart);
            this.losePopup.align(1, 2, game.world.width, game.world.height/4, Phaser.CENTER);
            this.losePopup.y = game.world.centerY - this.losePopup.height/2;

            // close

            this.closeButton = game.add.button(game.world.width - 10, 10, "close_button", this.onCloseTap, this, 0, 0, 0);
            this.closeButton.anchor.setTo(1, 0);

            // sound

            this.soundtrack = game.add.audio('soundtrack');


            this.gameGroup.visible = false;
            this.winPopup.visible = false;
            this.losePopup.visible = false;
        },

        update: function() {
        },



        reset: function() {

            this.set_lifes(3);

        },

        startGame: function() {

            this.reset();

            this.game_is_running = true;

            this.slutsky.frame = 5;

            this.closeButton.visible = false;
            this.welcomePopup.visible = false;
            this.winPopup.visible = false;
            this.losePopup.visible = false;

            // slutskyCreateTimer();
            this.slutsky.animations.stop();
            var self = this;
            setTimeout( function() {
                self.slutskyGiveUpPlease();
            }, 3000 );

            this.shadow_man_l_to_r_tween_go();
            this.shadow_man_r_to_l_tween_go();
            this.shadow_woman_l_to_r_tween_go();
            this.shadow_woman_r_to_l_tween_go();


            this.backTimer = game.time.create(true);
            this.backTimer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endBackTimer, this);
            this.backTimer.loop(1000, this.updateBackTimer, this);
            this.backTimer.start();
            this.backTimer_text.setText(this.formatTime(Math.round(90 - this.backTimer.seconds)));

            this.gameGroup.visible = true;

            this.soundtrack.play("", 3);
        },


        //////



        slutskyCreateTimer: function() {
            this.slutsky_hand_left_tween_outed = false;
            this.slutsky_hand_right_tween_outed = false;
            this.slutsky_timer = game.time.create(true);
            this.slutsky_timer.add(500 + Math.floor(Math.random() * 3500), this.slutskyMoveLeftHandIn, this);
            this.slutsky_timer.add(500 + Math.floor(Math.random() * 3500), this.slutskyMoveRightHandIn, this);
            this.slutsky_timer.start();
        },

        slutskyGiveUpPlease: function() {
            this.slutsky.animations.play('give_up');
        },

        slutskyGiveBackPlease: function() {
            this.slutsky.animations.stop();
            this.slutsky.animations.play('give_back');
        },

        slutskyGiveUpAnimationComplete: function(sprite, animation) {

            this.slutskyCreateTimer();
        },

        slutskyMoveLeftHandIn: function() {

            this.slutsky_hand_left.x = -this.slutsky_hand_left.width;
            this.slutsky_hand_left.y = game.world.centerY - 100 + Math.floor(Math.random() * 250);
            this.slutsky_hand_left_tween = game.add.tween(this.slutsky_hand_left).to( { x: 0 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.slutsky_hand_left_tween.onComplete.add(this.onSlutskyLeftHandComplete, this);

        },

        slutskyMoveRightHandIn: function() {

            this.slutsky_hand_right.x = game.world.width + this.slutsky_hand_right.width;
            this.slutsky_hand_right.y = game.world.centerY - 100 + Math.floor(Math.random() * 250);
            this.slutsky_hand_right_tween = game.add.tween(this.slutsky_hand_right).to( { x: game.world.width }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.slutsky_hand_right_tween.onComplete.add(this.onSlutskyRightHandComplete, this);

        },

        onSlutskyLeftHandComplete: function() {
            this.set_lifes(this.lifes-1);
            this.slutsky_hand_left.animations.play('spank');
            this.shameLeftJournalist();
            this.slutskyLeftSpank(500);
        },

        onSlutskyRightHandComplete: function() {
            this.set_lifes(this.lifes-1);
            this.slutsky_hand_right.animations.play('spank');
            this.shameRightJournalist();
            this.slutskyRightSpank(500);
        },

        onLeftKolpakkoving: function() {
            this.set_lifes(0);
            this.shameLeftJournalist();
            this.slutskyLeftSpank();
            this.slutskyRightSpank();
        },

        onRightKolpakkoving: function() {
            this.set_lifes(0);
            this.shameRightJournalist();
            this.slutskyLeftSpank();
            this.slutskyRightSpank();
        },

        onSlutskyLeftSpank: function(object, pointer) {
            this.slutskyLeftSpank(0);

            if(this.get_out_tween) this.get_out_tween.stop();
            this.get_out.x = pointer.x;
            this.get_out.y = pointer.y;
            this.get_out.scale.setTo(0, 0);
            this.get_out_tween = game.add.tween(this.get_out.scale).to( { x: 1, y: 1 }, 250, Phaser.Easing.Bounce.Out, true);
            this.get_out_tween.onComplete.add(this.onGetOutTweenComplete, this);
        },

        onSlutskyRightSpank: function(object, pointer) {
            this.slutskyRightSpank(0);

            if(this.get_out_tween) this.get_out_tween.stop();
            this.get_out.x = pointer.x;
            this.get_out.y = pointer.y;
            this.get_out.scale.setTo(0, 0);
            this.get_out_tween = game.add.tween(this.get_out.scale).to( { x: 1, y: 1 }, 250, Phaser.Easing.Bounce.Out, true);
            this.get_out_tween.onComplete.add(this.onGetOutTweenComplete, this);
        },

        onGetOutTweenComplete: function() {
            this.get_out_tween = game.add.tween(this.get_out.scale).to( { x: 0, y: 0 }, 250, Phaser.Easing.Bounce.Out, true);
        },

        shameLeftJournalist: function() {
            this.journalist_left.animations.play('shame');
            if(this.journalist_left_tween) this.journalist_left_tween.stop();
            this.journalist_left_tween = game.add.tween(this.journalist_left.scale).to( { x: 1.05, y: 1.05 }, 25, Phaser.Easing.Bounce.InOut, true, 0, 1, true);
            this.journalist_left_tween.onComplete.add(this.onJournalistLeftTweenComplete, this);
        },

        shameRightJournalist: function() {
            this.journalist_right.animations.play('shame');
            if(this.journalist_right_tween) this.journalist_right_tween.stop();
            this.journalist_right_tween = game.add.tween(this.journalist_right.scale).to( { x: 1.05, y: 1.05 }, 25, Phaser.Easing.Bounce.InOut, true, 0, 1, true);
            this.journalist_right_tween.onComplete.add(this.onJournalistRightTweenComplete, this);
        },

        onJournalistLeftTweenComplete: function() {
            this.journalist_left_tween = game.add.tween(this.journalist_left.scale).to( { x: 1, y: 1 }, 25, Phaser.Easing.Bounce.InOut, true);
        },

        onJournalistRightTweenComplete: function() {
            this.journalist_right_tween = game.add.tween(this.journalist_right.scale).to( { x: 1, y: 1 }, 25, Phaser.Easing.Bounce.InOut, true);
        },

        slutskyLeftSpank: function(delay = 0) {
            if(this.slutsky_hand_left_tween) this.slutsky_hand_left_tween.stop();
            this.slutsky_hand_left_tween = game.add.tween(this.slutsky_hand_left).to( { x: -this.slutsky_hand_left.width }, 500, Phaser.Easing.Linear.None, true, delay, 0, false);
            this.slutsky_hand_left_tween.onComplete.add(this.onSlutskyLeftHandOut, this);
        },

        slutskyRightSpank: function(delay = 0) {
            if(this.slutsky_hand_right_tween) this.slutsky_hand_right_tween.stop();
            this.slutsky_hand_right_tween = game.add.tween(this.slutsky_hand_right).to( { x: game.world.width + this.slutsky_hand_right.width }, 500, Phaser.Easing.Linear.None, true, delay, 0, false);
            this.slutsky_hand_right_tween.onComplete.add(this.onSlutskyRightHandOut, this);
        },

        onSlutskyLeftHandOut: function() {
            this.slutsky_hand_left_tween_outed = true;

            if(this.slutsky_hand_left_tween_outed && this.slutsky_hand_right_tween_outed) {
                if(this.game_is_running) this.slutskyCreateTimer();
            }
        },

        onSlutskyRightHandOut: function() {
            this.slutsky_hand_right_tween_outed = true;

            if(this.slutsky_hand_left_tween_outed && this.slutsky_hand_right_tween_outed) {
                if(this.game_is_running) this.slutskyCreateTimer();
            }
        },

        shadow_man_l_to_r_tween_go: function() {
            this.shadow_man_l_to_r.x = -200;
            this.shadow_man_l_to_r.y = game.world.height + 100;
            this.shadow_man_l_to_r_tween = game.add.tween(this.shadow_man_l_to_r).to( { x: game.world.width + 200 }, 3000 + Math.floor(Math.random() * 1000), Phaser.Easing.Linear.None, true, 1000 + Math.floor(Math.random() * 1000), 0);
            this.shadow_man_l_to_r_tween.onComplete.add(this.shadow_man_l_to_r_tween_go, this);
        },

        shadow_man_r_to_l_tween_go: function() {
            this.shadow_man_r_to_l.x = game.world.width + 200;
            this.shadow_man_r_to_l.y = game.world.height + 100;
            this.shadow_man_r_to_l_tween = game.add.tween(this.shadow_man_r_to_l).to( { x: -200 }, 3000 + Math.floor(Math.random() * 1000), Phaser.Easing.Linear.None, true, Math.floor(Math.random() * 1000), 0);
            this.shadow_man_r_to_l_tween.onComplete.add(this.shadow_man_r_to_l_tween_go, this);
        },

        shadow_woman_l_to_r_tween_go: function() {
            this.shadow_woman_l_to_r.x = -200;
            this.shadow_woman_l_to_r.y = game.world.height + 100;
            this.shadow_woman_l_to_r_tween = game.add.tween(this.shadow_woman_l_to_r).to( { x: game.world.width + 200 }, 3000 + Math.floor(Math.random() * 1000), Phaser.Easing.Linear.None, true, Math.floor(Math.random() * 1000), 0);
            this.shadow_woman_l_to_r_tween.onComplete.add(this.shadow_woman_l_to_r_tween_go, this);
        },

        shadow_woman_r_to_l_tween_go: function() {
            this.shadow_woman_r_to_l.x = game.world.width + 200;
            this.shadow_woman_r_to_l.y = game.world.height + 100;
            this.shadow_woman_r_to_l_tween = game.add.tween(this.shadow_woman_r_to_l).to( { x: -200 }, 3000 + Math.floor(Math.random() * 1000), Phaser.Easing.Linear.None, true, 1000 + Math.floor(Math.random() * 1000), 0);
            this.shadow_woman_r_to_l_tween.onComplete.add(this.shadow_woman_r_to_l_tween_go, this);
        },

        onPopupTap: function() {
            this.startGame();
        },

        onCloseTap: function() {
            // this.game.destroy();
            // loadScript("src/lentach2019.js", startMiniGame);
            game.state.start("Menu", true);
        },

        set_lifes: function(value) {
            this.lifes = value;
            if(this.lifes < 0) this.lifes = 0;
            this.lifes_text.setText(this.lifes);

            if(this.lifes <= 0) {
                this.stopGame();

                var self = this;
                setTimeout(function() { self.losePopup.visible = true; self.gameGroup.visible = false; self.closeButton.visible = true;}, 500);
            }
        },


        updateBackTimer: function() {
            this.backTimer_text.setText(this.formatTime(Math.round(90 - this.backTimer.seconds)));

        },

        endBackTimer: function() {

            this.stopGame();

            var self = this;
            setTimeout(function() { self.winPopup.visible = true; self.gameGroup.visible = false; self.closeButton.visible = true;}, 1500);
        },

        stopGame: function() {

            this.soundtrack.stop();

            this.slutskyGiveBackPlease();

            this.game_is_running = false;

            if(this.slutsky_timer) {
                this.slutsky_timer.stop();
                this.slutsky_timer.destroy();
            }

            this.backTimer.stop();
            this.backTimer.destroy();

            this.shadow_man_l_to_r_tween.stop();
            this.shadow_man_r_to_l_tween.stop();
            this.shadow_woman_l_to_r_tween.stop();
            this.shadow_woman_r_to_l_tween.stop();

            if(this.slutsky_hand_left_tween) this.slutsky_hand_left_tween.stop();
            if(this.slutsky_hand_right_tween) this.slutsky_hand_right_tween.stop();

            this.slutsky_hand_left.x = -this.slutsky_hand_left.width;
            this.slutsky_hand_right.x = game.world.width + this.slutsky_hand_right.width;
        },


        formatTime: function(s) {
            // Convert seconds (s) to a nicely formatted and padded time string
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);
        }
    }

//чтоб работало
//game.state.add('имя уровня', обьект);
// game.state.add('SlutSky', SlutSky);
// game.state.start('SlutSky'); //старт


// function loadScript(url, callback)
// {
//     // Adding the script tag to the head as suggested before
//     var head = document.head;
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = url;
//
//     // Then bind the event to the callback function.
//     // There are several events for cross browser compatibility.
//     script.onreadystatechange = callback;
//     script.onload = callback;
//
//     // Fire the loading
//     head.appendChild(script);
// }

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