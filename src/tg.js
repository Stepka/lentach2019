var tg = new Phaser.Game(960, 540, Phaser.AUTO, 'game', { preload: preload, create: start, update: update });

var dir = "assets/images/telegram/";
var win1;
var win2;
var win3;
var startBtn;
var delBtn;
var m = 0;

function preload(){
  tg.load.image('startBtn', dir+"telegram.png");
  tg.load.image('frst', dir+"1.png");
  tg.load.image('scnd', dir+"2.png");
  tg.load.image('thrd', dir+"3.png");
  tg.load.spritesheet("dur", dir+"durov.png", 395, 376, 5);
  tg.load.spritesheet('del', dir+"delete_icon.png", 74, 74, 3);
  tg.load.image('win', dir+'win.png');
}

function start(){
  tg.stage.backgroundColor = "#161e87";
  startBtn = tg.add.button(248, 50, 'startBtn', function(){tg.add.button(200, 100, 'win', function(){
    tg.destroy();
    loadScript("src/lentach2019.js", startMiniGame);
    }, this);}, this)
  delBtn = tg.add.button(850, 30, 'del', function(){
    var k = delBtn.animations.add('nope');
    delBtn.animations.play('nope', 8, false);
    m++;
    if(m>=3){
    var d = tg.add.sprite(450, 55, 'dur');
    rofl = d.animations.add('rofl');
    d.animations.play('rofl', 3, false);
    d.scale.setTo(1.3, 1.3);
    setTimeout(function(){d.destroy(); delBtn.input.enabled = false; delBtn.destroy();}, 2000);
  }
}, this);
  win3 = tg.add.button(0, 0, 'thrd', function(){win3.destroy();}, this);
  win2 = tg.add.button(0, 0, 'scnd', function(){win2.destroy();}, this);
  win1 = tg.add.button(0, 0, 'frst', function(){win1.destroy();}, this);
}

function update(){

}
