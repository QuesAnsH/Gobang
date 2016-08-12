var chess = document.getElementById("chess");
var context = chess.getContext('2d');
var me = true;
var over = false;
var haveChess = [];
var myWin = []		//赢法的统计数组
var youWin = []
var win = [];		//赢法数组
for (var i =0;i<15;i++) {
	haveChess[i] = [];
	for (var j = 0; j < 15; j++) {
		haveChess[i][j] = 0;
	}
}
for (var i =0;i<15;i++) {
	win[i] = [];
	for (var j =0;j<15;j++) {
		win[i][j] = [];
	}
}
var count = 0;
for (var i = 0; i < 15; i++) {
	for (var j =0;j<11;j++) {
		for (var k =0;k<5;k++) {
			win[i][j+k][count] = true;
		}
		count++;
	}
}
//竖列的赢法
for (var i = 0; i < 15; i++) {
	for (var j =0;j<11;j++) {
		for (var k =0;k<5;k++) {
			win[j+k][i][count] = true;
		}
		count++;
	}
}
//横排的赢法
for (var i = 0; i < 11; i++) {
	for (var j =0;j<11;j++) {
		for (var k =0;k<5;k++) {
			win[i+k][j+k][count] = true;
		}
		count++;
	}
}
//斜边的赢法
for (var i = 14; i>4; i--) {
	for (var j =0;j<11;j++) {
		for (var k =0;k<5;k++) {
			win[i-k][j+k][count] = true;
		}
		count++;
	}
}
//反斜边的赢法
for (var i = 0; i < count; i++) {
	myWin[i] = youWin[i] =0;
}
console.log(count);
var logo = new Image();
logo.src = 'img/th.gif';


logo.onload = function(){
	context.drawImage(logo,0,0,450,450);
	drawChess();
}
var drawChess = function(){
	
	context.strokeStyle = '#bfbfbf';
	for (var i = 0; i < 15; i++) {
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
	}
}

var dropChess =function(i,j,me){
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
		gradient.addColorStop(0,'#0a0a0a');
		gradient.addColorStop(1,'#636766');
	} else {
		gradient.addColorStop(0,'#d1d1d1');
		gradient.addColorStop(1,'#f9f9f9');
	}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	if(over) {
		return ;
	}
	if(!me) {
		return ;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if (haveChess[i][j] == 0) {
		dropChess(i,j,me);
		haveChess[i][j] = 1;
		for (var k = 0;k<count;k++) {
			if(win[i][j][k]){
				myWin[k]++;
				youWin[k] = 6;
				if(myWin[k] == 5){
					alert('you win');
					over = 'true'
				}
			}
		}
		if(!over) {
			me=!me;
			computerAI();
		}
	}
}

var computerAI = function() {
	var myScore = [];
	var computerScore = [];
	var max =0;
	var u =0,v=0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = []
		computerScore[i] = []
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (var i =0;i<15;i++) {
		for (var j=0;j<15;j++) {
			if(haveChess[i][j] ==0){
				for (var k =0;k<count;k++) {
					if(win[i][j][k]){
						switch(myWin[k]){
							case 1: myScore[i][j]+=200;break;
							case 2: myScore[i][j]+=400;break;
							case 3: myScore[i][j]+=2000;break;
							case 4: myScore[i][j]+=10000;break;
						}
						switch(youWin[k]){
							case 1: computerScore[i][j]+=220;break;
							case 2: computerScore[i][j]+=420;break;
							case 3: computerScore[i][j]+=2200;break;
							case 4: computerScore[i][j]+=20000;break;
						}
					}
				}
				if(myScore[i][j]>max){
					max = myScore[i][j];
					u=i;
					v=j;
				} else if(myScore[i][j] == max) {
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max = myScore[i][j];
					u=i;
					v=j;
				} else if(computerScore[i][j] == max) {
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
	dropChess(u,v,false);
	haveChess[u][v] = 2;
	for (var k = 0;k<count;k++) {
		if(win[u][v][k]){
			youWin[k]++;
			myWin[k] = 6;
			if(youWin[k] == 5){
				alert('you loser');
				over = 'true'
			}
		}
	}
	if(!over) {
		me=!me;
	}
}

//chess.onclick = function(e){
//	if(over) {
//		return ;
//	}
//	var x = e.offsetX;
//	var y = e.offsetY;
//	var i = Math.floor(x/30);
//	var j = Math.floor(y/30);
//	if (haveChess[i][j] == 0) {
//		dropChess(i,j,me);
//		if (me) {
//			haveChess[i][j] = 1;
//		} else{
//			haveChess[i][j] = 2;
//		}
//		me=!me;
//	}
//	for (var k = 0;k<count;k++) {
//		if(win[i][j][k]){
//			myWin[k]++;
//			youWin[k] = 6;
//			if(myWin[k] == 5){
//				alert('you win');
//				over = 'true'
//			}
//		}
//	}
//}
