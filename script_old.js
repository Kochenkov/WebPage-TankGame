// Это старый скрип, написанный в полу-ООП стиле
//(в данный момент не работает, есть ошибки при переносе) 
//Сделал новый, без класса танка. В данной задаче класс не нужен

var tank = function (xPozTank, yPozTank, tankId, towerId){
	this.wTank = document.getElementById(tankId).width;
	this.hTank = document.getElementById(tankId).height;
	this.xPozTank = xPozTank;
	this.yPozTank = yPozTank;
	this.angleTank = 0;
	this.angleTower = 0;
	this.rotateTank;
	this.rotateTower;
	this.radTank = 0;
	this.radTower = 0;
	this.xCenter = (this.xPozTank+this.wTank/2);
	this.yCenter = (this.yPozTank+this.hTank/2);
	this.sinTower;
	this.hypotenuse;
	this.xBullet=0;
	this.yBullet=0;
	this.timerBullet = setInterval;
	this.click = true;
	
	// обновление позиции танка
	this.reload = function() {
		this.xPozTower = this.xPozTank;
		this.yPozTower = this.yPozTank;
		document.getElementById(tankId).style.left =  this.xPozTank + 'px';
		document.getElementById(tankId).style.top =  this.yPozTank + 'px';
		document.getElementById(towerId).style.left =  this.xPozTower + 'px';
		document.getElementById(towerId).style.top =  this.yPozTower + 'px';	
	}
	//изменение координаты поворота
	this.turning = function(num) {
		this.angleTank = this.angleTank + num;
		this.radTank = this.angleTank*Math.PI/180;
		this.rotateTank = 'rotate('+this.angleTank+'deg'+')';
		document.getElementById(tankId).style.transform = this.rotateTank;
	}
	//изменение координаты движения
	this.going = function(num1, num2) {
		this.yPozTank = this.yPozTank + num1*(Math.cos(this.radTank));
		this.xPozTank = this.xPozTank + num2*(Math.sin(this.radTank));
	}
	
	this.rotation = function() {
		this.xCenter = (this.xPozTank+this.wTank/2);
		this.yCenter = (this.yPozTank+this.hTank/2);
		//тут ошибка, нельзя перенести 'e' внутрь класса. Или можно? Пока вообще уберу ООП.
		this.sinTower = ((e.pageY-this.yCenter)/(Math.sqrt(((e.pageY-this.yCenter)**2)+((e.pageX-this.xCenter)**2))));
		this.radTower = Math.asin(this.sinTower);
		this.angleTower = this.radTower*180/Math.PI;
		if ((e.pageX-this.xCenter)>0) {
			this.angleTower = this.radTower*180/Math.PI+90;
			this.rotateTower = 'rotate('+this.angleTower+'deg'+')';	
			document.getElementById(towerId).style.transform = this.rotateTower;
		}
		else {
			this.angleTower = -this.radTower*180/Math.PI-90;
			this.rotateTower = 'rotate('+this.angleTower+'deg'+')';	
			document.getElementById(towerId).style.transform = this.rotateTower;
		}
	}
}

var tank1 = new tank(500, 200, 'tank1','tower1');
tank1.reload(); //сразу обновляем позицию элементов дом-дерева

// движение и поворот танка
document.onkeydown = function(e) {
	if (e.keyCode==68) {
		tank1.turning(5);
	}
	if (e.keyCode==65) {
		tank1.turning(-5);
	}
	if (e.keyCode==87) {
		tank1.going(-5,5);
	}
	if (e.keyCode==83) {
		tank1.going(5,-5);
	}
	tank1.reload();
}

// стрельба
document.addEventListener("click", function(e){
	if (click==true) {
		var hole = document.createElement('img');
		hole.src = 'images/hole.gif';
		hole.style.position = 'absolute';
		var bullet = document.createElement('img');
		bullet.src = 'images/снаряд.png';
		bullet.style.position = 'absolute';
		tank1.angleBullet = tank1.angleTower;
		tank1.radBullet= (tank1.angleBullet-90)*Math.PI/180;
		tank1.xCenter = (tank1.xPozTank+tank1.wTank/2);
		tank1.yCenter = (tank1.yPozTank+tank1.hTank/2);
		tank1.xBulletCenter = tank1.xCenter
		tank1.yBulletCenter = tank1.yCenter
		tank1.hypotenuse = Math.sqrt(((e.pageY-tank1.yCenter)**2)+((e.pageX-tank1.xCenter)**2));
		var koef = 50;
		bullet.style.left = tank1.xBullet + 'px';
		bullet.style.top = tank1.yBullet + 'px';
	
		if ((tank1.hypotenuse>=100)&&(tank1.hypotenuse<=1000)) {
			click=false;
			setTimeout (function() {click=true},1000);
			document.getElementById("div1").appendChild(bullet);
			var audioBang = new Audio();
			audioBang.preload = 'auto';
			audioBang.src = 'sounds/bang.mp3';
			audioBang.play();
	
			timerBullet = setInterval(function() {
				koef = koef+10;
				tank1.yBullet = tank1.yBulletCenter+koef*(Math.sin(tank1.radBullet));
				tank1.xBullet = tank1.xBulletCenter+koef*(Math.cos(tank1.radBullet));
				bullet.style.left = tank1.xBullet + 'px';
				bullet.style.top = tank1.yBullet + 'px';
				if (koef > tank1.hypotenuse) {
					clearInterval(timerBullet);
					hole.style.left = tank1.xBullet -hole.width/2 + 'px';
					hole.style.top = tank1.yBullet -hole.height/2 + 'px';
					document.getElementById("div1").appendChild(hole);
					}

			}, 10);

		}
		else if (tank1.hypotenuse<100) {
			click=false;
			setTimeout (function() {click=true},1000);
			var audioDistance = new Audio();
			audioDistance.preload = 'auto';
			audioDistance.src = 'sounds/wery_close_distance.mp3';
			audioDistance.play();
		}
		else if (tank1.hypotenuse>1000){
			click=false;
			setTimeout (function() {click=true},1000);
			var audioDistance = new Audio();
			audioDistance.preload = 'auto';
			audioDistance.src = 'sounds/wery_long_distance.mp3';
			audioDistance.play();
		}
	}
})


// поворот башни 
document.getElementById('div1').onmousemove = function(e) {
	tank1.rotation();
}

