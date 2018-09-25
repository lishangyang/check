//声明变量获取页面元素
var frameBox = document.getElementById('frameBox');
var startBot = document.getElementById('start');
var pause = document.getElementById('pause');
var countBot = document.getElementById('count');
var settlement = document.getElementById('settlement');
var continueDiv = document.getElementById('continue');
var suspend = document.getElementById('suspend');

var count = 0;
//声明变量获取游戏界面的宽高度
var frameSet = frameBox.currentStyle ? frameBox.currentStyle : window.getComputedStyle(frameBox, null);
//声明一个变量代替frameBox现在的样式
var stageSizeX = parseInt(frameSet.width);
var stageSizeY = parseInt(frameSet.height);

//创建不同型号敌方的飞机
var smallPlane = {
	//	 小型飞机
	width: 34,
	height: 24,
	imgSrc: './img/enemy-plane-s.png',
	boomSrc: './img/enemy-plane-s-boom.gif',
	boomTime: 100,
	hp: 1
};

var MediumAircraft = {
	//	中型飞机
	width: 46,
	height: 60,
	imgSrc: './img/enemy-plane-m.png',
	hitSrc: './img/enemy-plane-m-hit.png',
	boomSrc: './img/enemy-plane-m-boom.gif',
	boomTime: 100,
	hp: 3
};

var jumbo = {
	//	大型飞机
	width: 110,
	height: 164,
	imgSrc: './img/enemy-plane-l.png',
	hitSrc: './img/enemy-plane-l-hit.png',
	boomSrc: './img/enemy-plane-l-boom.gif',
	boomTime: 100,
	hp: 7
};

var ownPlaneX = {
	width: 66,
	height: 80,
	imgSrc: './img/our-plane.gif',
	boomSrc: './img/our-plane-boom.gif',
	boomTime: 100,
	hp: 1
};

var bulletX = {
	width: 6,
	height: 14,
	imgSrc: './img/our-bullet.png',
	speed: 20
};

//创建飞机的构造函数，方便不同型号的飞机的调取
var Airplane = function(coordinateX, coordinateY, airplaneMdel, speed) {
	this.coordinateX = coordinateX;
	//	飞机的X轴坐标点
	this.coordinateY = coordinateY;
	//  飞机的Y轴坐标点
	this.sizeX = airplaneMdel.width;
	this.sizeY = airplaneMdel.height;
	this.imgSrc = airplaneMdel.imgSrc;
	this.boomSrc = airplaneMdel.boomSrc;
	this.boomTime = airplaneMdel.boomTime;
	this.hp = airplaneMdel.hp;
	this.speed = speed;
	//  当前对象的飞机

	// 飞机定位点
	this.currentX = this.coordinateX - this.sizeX / 2;
	this.currentY = this.coordinateY - this.sizeY / 2;
	//  console.log(airplane);
}

//
////显示飞机,draw方法
Airplane.prototype.draw = function() {
	this.imgdiss = new Image();
	//	制造一个新的img元素
	this.imgdiss.src = this.imgSrc;
	this.imgdiss.style.top = this.coordinateY - this.sizeY / 2 + 'px';
	this.imgdiss.style.left = this.coordinateX - this.sizeX / 2 + 'px';
	pause.appendChild(this.imgdiss);
}
//
//某个飞机的移动方法,move方法
Airplane.prototype.move = function() {
	//	this.checkOverRange();
	this.coordinateY += this.speed;
	//	Y轴坐标累加上当前速度促使Y轴移动
//	this.coordinateY = this.currentY + this.sizeY/2;
	this.imgdiss.style.top = this.coordinateY + 'px';
	//	当前飞机的
//	this.coordinateY = this.currentY + this.sizeY/2;
	this.checkOverRange();
}

// 检测飞机超出画布
Airplane.prototype.checkOverRange = function() {
	// 如果飞机超出画布 就给当前飞机对象添加一个BottomRange的属性
	this.isBottomRange = this.coordinateY > (stageSizeY - this.sizeY);
	this.isTopRange = this.currentY < 0;
	//		console.log('xxx');
}
//
////用new方法把对象实例化,得以显现出来
//var smallPlane = new Airplane(17, 12, smallPlane, 10);
//smallPlane.draw();
//var MediumAircraft = new Airplane(297, 10, MediumAircraft , 5);
//MediumAircraft.draw();

//所有敌机的构造函数
var Any = function() {
	this.segments = [];
	// 	创建一个当前对象的数组得以调用
	this.generateArray = 0;
	//  当前对象数值为零
};

//随机产生的min-max的随机数(这是敌机随机出现在某个位置原因)
var randomNumber = function(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
	//	随机生成一个随机整数并返回保存数值,该加括号必须要加,要不容易生成报错或者非数
	// 随机数当成   min+(max-min)  范围min 到 (min + (max-min))
}

//实例化所有敌机
var enemies = new Any();

//生成画出所有敌机的方法
Any.prototype.createNewAny = function() {
	this.generateArray++;

	if(this.generateArray % 15 === 0) {
		this.newAny = new Airplane(randomNumber(jumbo.width / 2, stageSizeX - jumbo.width / 2), 12, jumbo, 1)
	} else if(this.generateArray % 8 === 0) {
		this.newAny = new Airplane(randomNumber(MediumAircraft.width / 2, stageSizeX - MediumAircraft.width / 2), 12, MediumAircraft, randomNumber(2, 3))
	} else {
		this.newAny = new Airplane(randomNumber(smallPlane.width / 2, stageSizeX - smallPlane.width / 2), 12, smallPlane, randomNumber(3, 5))
	}

	this.segments.push(this.newAny);
	// 把新生成的飞机写入数组
	this.newAny.draw();
	// 把新生成的飞机画出来
	//	console.log(createNewAny);
}

//移动所有敌机
Any.prototype.moveAllAny = function() {
	// 遍历敌机对象里面的保存敌机的数组 让每一个都移动
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].move();
		//		如果超出画布怎么样
		if(this.segments[i].isBottomRange) {
			pause.removeChild(this.segments[i].imgdiss);
			this.segments.splice(i, 1);
			//			console.log('xxx');
		}

		//检测子弹碰撞
		for(var j = 0; j < ownPlane.segement.length; j++) {
			

			// 如果飞机还未死亡就挡住子弹
			if(this.segments[i].hp > 0) {
				var horizontalCollision = Math.abs(this.segments[i].coordinateX - ownPlane.segement[j].coordinateX) < (this.segments[i].sizeX / 2 + ownPlane.segement[j].sizeX / 2)
				var verticalCollision = Math.abs(this.segments[i].coordinateY - ownPlane.segement[j].coordinateY) < (this.segments[i].sizeY / 2 + ownPlane.segement[j].sizeY / 2)
				var checkBulletCollision = horizontalCollision && verticalCollision;

				if(checkBulletCollision) {
					// 飞机挨打
					count++;
					countBot.innerHTML = count;
					this.segments[i].imgdiss.src = this.segments[i].hitSrc ? this.segments[i].hitSrc : this.segments[i].boomSrc;
					this.segments[i].hp--;

					// 把子弹干掉
					pause.removeChild(ownPlane.segement[j].imgdiss);
					ownPlane.segement.splice(j, 1);
				}
			}
		}
		//检测与我方飞机的碰撞
		var ourHorizontalCollision = Math.abs(this.segments[i].coordinateX - ownPlane.coordinateX) < (this.segments[i].sizeX / 2 + ownPlane.sizeX / 2);
		var ourVerticalCollision = Math.abs(this.segments[i].coordinateY - ownPlane.coordinateY) < (this.segments[i].sizeY / 2 + ownPlane.sizeY / 2);
		var checkOurCollision = ourHorizontalCollision && ourVerticalCollision;

		if(checkOurCollision) {
			this.segments[i].hp = 0;
			ownPlane.hp--;
		}

		//检测飞机是否死亡
		if(this.segments[i].hp <= 0) {
			this.segments[i].imgdiss.src = this.segments[i].boomSrc;
			this.segments[i].boomTime -= 10;
			// 把飞机干掉
			if(this.segments[i].boomTime <= 0) {
				pause.removeChild(this.segments[i].imgdiss);
				this.segments.splice(i, 1);
			}
		}

	}
}

//构造自身的飞机
var ownPlane = new Airplane(stageSizeX / 2, stageSizeY - ownPlaneX.height / 2, ownPlaneX, 0);
ownPlane.draw();

//鼠标控制事件(鼠标控制飞机)
pause.onmousemove = function(ev) {

	ownPlane.coordinateX = ev.clientX - frameBox.offsetLeft;
	if(ownPlane.coordinateX < 0) {
		ownPlane.coordinateX = 0;
	}
	if(ownPlane.coordinateX > stageSizeX) {
		ownPlane.coordinateX = stageSizeX;
	}
	ownPlane.coordinateY = ev.clientY - frameBox.offsetTop;
	if(ownPlane.coordinateY < 0) {
		ownPlane.coordinateY = 0;
	}
	if(ownPlane.coordinateY > (stageSizeY - ownPlane.sizeY / 2)) {
		ownPlane.coordinateY = (stageSizeY - ownPlane.sizeY / 2);
	}

	ownPlane.currentX = ownPlane.coordinateX - ownPlane.sizeX / 2;
	ownPlane.currentY  = ownPlane.coordinateY - ownPlane.sizeY / 2;

	ownPlane.imgdiss.style.left = ownPlane.currentX + 'px';
	ownPlane.imgdiss.style.top = ownPlane.currentY + 'px';
}

// 在我方飞机A ourPlane 这个对象里面添加一个数组 用来保存他发射的子弹
ownPlane.segement = []

//子弹构造函数
var Bullet = Airplane;

function creatNewBullet() {
	ownPlane.newBullet = new Bullet(ownPlane.coordinateX, ownPlane.coordinateY - ownPlane.sizeY / 2, bulletX, -10);
	ownPlane.segement.push(ownPlane.newBullet);
	ownPlane.newBullet.draw();
}

function moveNewBullet() {
	for(var i = 0; i < ownPlane.segement.length; i++) {
		ownPlane.segement[i].move();
		if(ownPlane.segement[i].isTopRange) {
			pause.removeChild(ownPlane.segement[i].imgdiss);
			ownPlane.segement.splice(i, 1);
		}
	}
}

var gameOver = function() {
	ownPlane.imgdiss.src = ownPlane.boomSrc;
	clearInterval(timeID);
	settlement.style.display = 'block';
	document.querySelector('p#final-count').innerText = count;
}

var time = 0;

var timeID;
var start = function() {
	//隐藏开始页面
	startBot.style.display = 'none';
	//显示游戏页面
	pause.style.display = 'block';
	// 
	suspend.style.display = 'none';
	settlement.style.display = 'none';
	//调用move,然后让图像周期执行运动
	timeID = setInterval(function() {
		time++;
		if(time % 50 === 0) {
			enemies.createNewAny();
		}
		enemies.moveAllAny();

		if(time % 5 === 0) {
			creatNewBullet();
		}
		moveNewBullet();

		if(ownPlane.hp <= 0) {
			gameOver();
		}
	}, 30);

}
var restart = function() {
	window.location.reload();
}
continueDiv.onclick = function(ev) {
	ev.stopPropagation();
	start();
};
pause.onclick = function() {
	clearTimeout(timeID);
	suspend.style.display = 'block';
}