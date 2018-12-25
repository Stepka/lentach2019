var pension = new Phaser.Game(960, 540, Phaser.AUTO, 'pension', { preload: preload, create: start, update: update });

var dir = "assets/images/pension/";
var hero;
var walk;
var leftBtn;
var rightBtn;
var floors = [];
var scene = [];
var c;
var left = false;
var right = false; //для защиты от холда
var lifes = 3;
var hrts = [];
var isLose = false;
var green = 0;
var red = 0;
var timer;
var mainImterval;
var r;
var g;
var q;
var kLeft;
var kRight;
var lClick;
var rClick;

function preload(){
  pension.load.image("rightClick", dir+"gg_right.png");
  pension.load.image("leftClick", dir+"gg_left.png");
  pension.load.spritesheet("s0", dir+"playing.png", 127, 127, 2);
  pension.load.spritesheet("s1", dir+"sleep.png", 127, 127, 2);
  pension.load.spritesheet("s2", dir+"cup.png", 127, 127, 2);
  pension.load.image("a0", dir+"normal.png");
  pension.load.image("a1", dir+"woman.png");
  pension.load.image("a2", dir+"normal.png");
  pension.load.image("bg", dir+"bg.png");
  pension.load.image("arm", dir+"arm.png");
  pension.load.spritesheet('hero', dir+"go.png", 255, 255, 4);
  pension.load.image('btn', dir+"btn.png");
  pension.load.image('hrt', dir+"heart.png");
  pension.load.image('lose', dir+"lose.png");
  pension.load.image('undbg', dir+"undbg.png");
  pension.load.image('green', dir+"green.png");
  pension.load.image('red', dir+"redline.png");
  pension.load.image('win', dir+"win.png");
  pension.load.audio('rock', dir+"queen.mp3");
}

function start(){
  q = pension.add.audio('rock');
  q.play();
   var graphics = pension.add.graphics(100, 100);
  kLeft = pension.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  kRight = pension.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  kLeft.onUp.add(function(key){left = false;}, this);
  kRight.onUp.add(function(key){right = false;}, this);
  kLeft.onDown.add(function(key){
    if(!left){
      move(0); //нажали кнопку влево, проверили сleva li spyashiy. Если да — передвигаем на один ряд вверх, добавляем очки
      left = true;
      }
  }, this);
  kRight.onDown.add(function(key){
    if(!right){
          move(1); //тоже самое, но проверяем политика справа
          right = true;
        }
  }, this);
  pension.add.tileSprite(0, 0, 960, 540, 'bg');
  hero = pension.add.sprite(350, 300, 'hero');
  walk = hero.animations.add('walk', [1, 0]);
  lClick  = hero.animations.add('lClick', [2, 0]);
  rClick  = hero.animations.add('rClick', [3, 1]);
  leftBtn = pension.add.button(-20, 270, 'btn', function(){go(1); move(0);}, this);
  rightBtn = pension.add.button(980, 270, 'btn', function(){go(0); move(1);}, this);
  rightBtn.scale.x *= -1;
  createFloors(150);
  drawFloors();
  c = 2;
  for(var i = lifes; i > 0; i--){
    hrts[i] = pension.add.sprite(770+(i*40), 30, 'hrt');
  }
timer = setInterval(function() {
  red += 0.01;
}, 500);
mainImterval = setInterval(function() {
  r = pension.add.sprite(10, 50, 'red');
  r.scale.setTo(red*2.5, 1.5);
  g = pension.add.sprite(10, 160, 'green');
  g.scale.setTo(green*2.5, 1.5);

  if(red >= 1){ gameOver(false); isLose = true; clearInterval(timer);}
  if(green >= 1) { gameOver(true); isLose = true; clearInterval(timer);}
}, 100);
var k = pension.add.sprite(10, 50, 'undbg');
k.scale.setTo(2.5, 1.5);
var k = pension.add.sprite(10, 160, 'undbg');
k.scale.setTo(2.5, 1.5);
}

function update(){

}

function floor(left, right){
  this.left = left; //депутат который слева
  this.right = right;
}

function dep(type){ // type => "s" - спит, "a" - нет
  this.type = type; //спит или нет
  var t = rand(3);
  if(t == 2) t = rand(3);
  this.sprite = type+t; //выбираем случайный спрайт
}

function rand(s){
  return Math.floor(Math.random() * s); //случайное число от 0 до s
}

function go(h){
  hero.animations.play('walk', 2, false);
  if(h == 1) hero.animations.play('lClick', 6, false);
  if(h == 0) hero.animations.play('rClick', 6, false);
}

function createFloors(count){
  var d = ["a", "s"];
  for(var i = 0; i <= count; i++){
    var m = rand(2); //случайное число от 0 до 1
    var f = new floor(new dep(d[m]), new dep(d[1-m])); //спящий депутат с случайной стороны и активный с другой (1-1 = 0, 1-0 = 1)
    floors[i] = f;
  }
}


function drawFloors(){
  for(var i = 0; i < floors["length"]; i++){
    s = new sceneFloor();
    s.left = pension.add.sprite(230, (i*(-130))+540, floors[i].left.sprite)
    s.right = pension.add.sprite(605, (i*(-130))+540, floors[i].right.sprite)
    if(floors[i].left.type == "s") s.left.animations.add('click');
    else s.right.animations.add('click');
    scene[i] = s;
  }
}

function move(half){
  if(half == 0 && floors[c].left.type == "s"){
    go(1);
  for(var i = 0; i < scene["length"]; i++){
    scene[i].left.position.y += 128;
    scene[i].right.position.y += 128;
  }
  c++;
  green += 0.015;
  scene[c-1].left.animations.play('click', 30, false);
}
  else if(half == 1 && floors[c].right.type == "s"){
    go(0);
    for(var i = 0; i < scene["length"]; i++){
      scene[i].left.position.y += 128;
      scene[i].right.position.y += 128;
    }
    green += 0.015;
    c++;
    scene[c-1].right.animations.play('click', 30, false);
  }
  else{ lifes--; red += 0.07;}

  for(var i = 1; i < hrts.length; i++) hrts[i].destroy();
  for(var h = lifes; h > 0; h--) hrts[h] = pension.add.sprite(770+(h*40), 30, 'hrt');
  if(lifes <= 0 && !isLose){ gameOver(false); isLose = true;}
}

function sceneFloor(left, right){
  this.left = left;
  this.right = right;
}

function gameOver(win){
  if(!win) pension.add.button(200, 100, 'lose', function(){
      pension.destroy();
      loadScript("src/lentach2019.js", startMiniGame);
  }, this);
  if(win) pension.add.button(200, 100, 'win', function(){
      this.pension.destroy();
      loadScript("src/lentach2019.js", startMiniGame);
  }, this);
  clearInterval(timer);
  clearInterval(mainImterval);
  leftBtn.input.enabled = false;
  rightBtn.input.enabled = false;
  kLeft.enabled = false;
  kRight.enabled = false;

  q.stop();
}
