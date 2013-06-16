var socket = io.connect('/trace');
var sendPoint, captureScreen, sendImage;

var Throttle = function Throttle(minInterval) {

	var timestamp = 0,
		exec,
		timer;

	exec = function exec(func, args) {

		var now = +new Date(),
				diff;

		diff = now - timestamp;

		if (timer) {
			// clear the timeout, if one is pending
			clearTimeout(timer);
			timer = null;
		}

		if(diff >= minInterval){
			timestamp = now;
			func.apply(null, args);
		}else{
			timer = setTimeout(function(){
				exec(func, args);
			}, minInterval - diff);
		}

	};

	return {
		exec: exec
	}
};

sendPoint = function sendPoint(x, y) {

	var point = {};
	point.x = x;
	point.y = y;
	socket.emit('emit.mousepoint', point);

};

var throttle = new Throttle(100);

$(document).on('mousemove', function (e) {

	//mousepoint取得
	var x, y;

	//スクロールしても変化して欲しくないのでpageX,pageYを使う
	x = e.pageX;
	y = e.pageY;

	throttle.exec(sendPoint, [x, y]);

});

$(document).on('click', function (e) {

	//mousepoint取得
	var point = {};

	//スクロールしても変化して欲しくないのでpageX,pageYを使う
	point.x = e.pageX;
	point.y = e.pageY;

	socket.emit('emit.click', point);

});

captureScreen = function captureScreen(){

	html2canvas(document.body, {
		onrendered: function(canvas) {

			sendImage(canvas.toDataURL());

		},
//		width: document.documentElement.clientWidth,
//		height: document.documentElement.clientHeight
		width: 200,
		height: 300
	});

};

sendImage = function sendImage(binay){

	socket.emit('emit.image', binay);

}

//画面キャプチャ
setInterval(captureScreen, 10000);

socket.on('put.image', function (data) {
	console.log(data);
	$('img').attr('src', data);
});