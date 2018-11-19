var wTank = document.getElementById('tank1').width;
var hTank = document.getElementById('tank1').height;
var xPozTank = 500;
var yPozTank = 200;
var angleTank = 0;
var angleTower = 0;
var rotateTank;
var rotateTower;
var radTank = 0;
var radTower = 0;
var xCenter = (xPozTank+wTank/2);
var yCenter = (yPozTank+hTank/2);
var sinTower;
var hypotenuse;
var xBullet=0;
var yBullet=0;

// обновление позиции танка (входит в передвижение)
var reload = function() {
	xPozTower = xPozTank;
	yPozTower = yPozTank;
	document.getElementById('tank1').style.left =  xPozTank + 'px';
	document.getElementById('tank1').style.top =  yPozTank + 'px';
	document.getElementById('tower1').style.left =  xPozTower + 'px';
	document.getElementById('tower1').style.top =  yPozTower + 'px';	
}

reload(); //сразу обновляем позицию элементов дом-дерева

var timerBullet = setInterval;
var click = true;

// передвижение и поворот танка
document.onkeydown = function(e) {
	if (e.keyCode==68) {
		angleTank = angleTank +5;
		radTank = angleTank*Math.PI/180;
		rotateTank = 'rotate('+angleTank+'deg'+')';
		document.getElementById('tank1').style.transform = rotateTank;
	}
	if (e.keyCode==65) {
		angleTank = angleTank -5;
		radTank = angleTank*Math.PI/180;
		rotateTank = 'rotate('+angleTank+'deg'+')';
		document.getElementById('tank1').style.transform = rotateTank;
	}
	if (e.keyCode==87) {
		yPozTank = yPozTank - 5*(Math.cos(radTank));
		xPozTank = xPozTank + 5*(Math.sin(radTank));
	}
	if (e.keyCode==83) {
		yPozTank = yPozTank + 5*(Math.cos(radTank));
		xPozTank = xPozTank - 5*(Math.sin(radTank));
	}
	reload();
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
		angleBullet = angleTower;
		radBullet= (angleBullet-90)*Math.PI/180;
		xCenter = (xPozTank+wTank/2);
		yCenter = (yPozTank+hTank/2);
		xBulletCenter = xCenter
		yBulletCenter = yCenter
		hypotenuse = Math.sqrt(((e.pageY-yCenter)**2)+((e.pageX-xCenter)**2));
		var koef = 50;
		bullet.style.left = xBullet + 'px';
		bullet.style.top = yBullet + 'px';
		if ((hypotenuse>=100)&&(hypotenuse<=1000)) {
			click=false;
			setTimeout (function() {click=true},1000);
			document.getElementById("div1").appendChild(bullet);
			var audioBang = new Audio();
			audioBang.preload = 'auto';
			audioBang.src = 'sounds/bang.mp3';
			audioBang.play();
			timerBullet = setInterval(function() {
				koef = koef+10;
				yBullet = yBulletCenter+koef*(Math.sin(radBullet));
				xBullet = xBulletCenter+koef*(Math.cos(radBullet));
				bullet.style.left = xBullet + 'px';
				bullet.style.top = yBullet + 'px';
				if (koef > hypotenuse) {
					clearInterval(timerBullet);
					hole.style.left = xBullet -hole.width/2 + 'px';
					hole.style.top = yBullet -hole.height/2 + 'px';
					document.getElementById("div1").appendChild(hole);
				}
			}, 10);
		}
		
		else if (hypotenuse<100) {
			click=false;
			setTimeout (function() {click=true},1000);
			var audioDistance = new Audio();
			audioDistance.preload = 'auto';
			audioDistance.src = 'sounds/wery_close_distance.mp3';
			audioDistance.play();
		}
		else if (hypotenuse>1000){
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
	xCenter = (xPozTank+wTank/2);
	yCenter = (yPozTank+hTank/2);
	sinTower = ((e.pageY-yCenter)/(Math.sqrt(((e.pageY-yCenter)**2)+((e.pageX-xCenter)**2))));
	radTower = Math.asin(sinTower);
	angleTower = radTower*180/Math.PI;
	if ((e.pageX-xCenter)>0) {
		angleTower = radTower*180/Math.PI+90;
		rotateTower = 'rotate('+angleTower+'deg'+')';	
		document.getElementById('tower1').style.transform = rotateTower;
	}
	else {
		angleTower = -radTower*180/Math.PI-90;
		rotateTower = 'rotate('+angleTower+'deg'+')';	
		document.getElementById('tower1').style.transform = rotateTower;
	}
}

alert('Управление танком осуществляется клавишами w, a, s, d. Поворот башни зависит от положения курсора мыши. Выстрел осуществляется нажатием на л.к.м. Если готовы начать, нажмите ОК'); 

