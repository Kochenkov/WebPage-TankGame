var tank1 = {}
tank1.wTank = document.getElementById('tank1').width;
tank1.hTank = document.getElementById('tank1').height;
tank1.xPozTank = 500;
tank1.yPozTank = 200;
tank1.angleTank = 0;
tank1.angleTower = 0;

tank1.rotateTank;
tank1.rotateTower;
tank1.radTank = 0;
tank1.radTower = 0;

tank1.xCenter;
tank1.yCenter;
tank1.sinTower;
tank1.hypotenuse;

tank1.xBullet=0;
tank1.yBullet=0;

var timerBullet = setInterval;
var click = true;

// обновление позиции танка (входит в передвижение)
tank1.reload = function() {
	tank1.xPozTower = tank1.xPozTank;
	tank1.yPozTower = tank1.yPozTank;
	document.getElementById('tank1').style.left =  tank1.xPozTank + 'px';
	document.getElementById('tank1').style.top =  tank1.yPozTank + 'px';
	document.getElementById('tower1').style.left =  tank1.xPozTower + 'px';
	document.getElementById('tower1').style.top =  tank1.yPozTower + 'px';	
}

// движение и поворот танка
document.onkeydown = function(e) {
	if (e.keyCode==68) {
		tank1.angleTank = tank1.angleTank +5;
		tank1.radTank = tank1.angleTank*Math.PI/180;
		tank1.rotateTank = 'rotate('+tank1.angleTank+'deg'+')';
		document.getElementById('tank1').style.transform = tank1.rotateTank;
		}
	if (e.keyCode==65) {
		tank1.angleTank = tank1.angleTank -5;
		tank1.radTank = tank1.angleTank*Math.PI/180;
		tank1.rotateTank = 'rotate('+tank1.angleTank+'deg'+')';
		document.getElementById('tank1').style.transform = tank1.rotateTank;
		}
	if (e.keyCode==87) {
		tank1.yPozTank = tank1.yPozTank - 5*(Math.cos(tank1.radTank));
		tank1.xPozTank = tank1.xPozTank + 5*(Math.sin(tank1.radTank));
		}
	if (e.keyCode==83) {
		tank1.yPozTank = tank1.yPozTank + 5*(Math.cos(tank1.radTank));
		tank1.xPozTank = tank1.xPozTank - 5*(Math.sin(tank1.radTank));
		}
	tank1.reload();
}


// стрельба
document.addEventListener("click", function(e){
	if (click==true) {
		var hole = document.createElement('img');
		hole.src = 'images/hole.png';
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
	
		if ((tank1.hypotenuse>100)&&(tank1.hypotenuse<1000)) {
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
		else {
			var audioDistance = new Audio();
			audioDistance.preload = 'auto';
			audioDistance.src = 'sounds/distance.mp3';
			audioDistance.play();
		}
	}
})



// поворот башни 
document.getElementById('div1').onmousemove = function(e) {
	tank1.xCenter = (tank1.xPozTank+tank1.wTank/2);
	tank1.yCenter = (tank1.yPozTank+tank1.hTank/2);
	tank1.sinTower = ((e.pageY-tank1.yCenter)/(Math.sqrt(((e.pageY-tank1.yCenter)**2)+((e.pageX-tank1.xCenter)**2))));
	tank1.radTower = Math.asin(tank1.sinTower);
	tank1.angleTower = tank1.radTower*180/Math.PI;
	if ((e.pageX-tank1.xCenter)>0) {
		tank1.angleTower = tank1.radTower*180/Math.PI+90;
		tank1.rotateTower = 'rotate('+tank1.angleTower+'deg'+')';	
		document.getElementById('tower1').style.transform = tank1.rotateTower;
	}
	else {
		tank1.angleTower = -tank1.radTower*180/Math.PI-90;
		tank1.rotateTower = 'rotate('+tank1.angleTower+'deg'+')';	
		document.getElementById('tower1').style.transform = tank1.rotateTower;
	}
}



// начало выполнения программы
tank1.xCenter = (tank1.xPozTank+tank1.wTank/2);
tank1.yCenter = (tank1.yPozTank+tank1.hTank/2);
tank1.reload();

