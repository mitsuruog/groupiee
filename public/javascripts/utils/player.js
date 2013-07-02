MyApp.Utils.Player = function () {

	var play,
		screenSize = {
			width: 644,
			height: 354
		},
		beforeMousePosition,
		beforeTime,
		methods = {},
		screenImage,
		setTimer;

	var stage = new Kinetic.Stage({
		container: 'canvas',
		width: screenSize.width,
		height: screenSize.height
	});

	var layer = new Kinetic.Layer();

	layer.clear();

	var background = new Image();
	background.onload = function () {
		var image = new Kinetic.Image({
			x: 0,
			y: 0,
			image: background,
			width: screenSize.width,
			height: screenSize.height
		});

		screenImage = image;

		layer.add(image);
		image.moveToBottom();

		stage.add(layer);

	};

	play = function play(collections) {

		if (!collections.length) {
			return;
		}

		var part = collections.shift();
		methods[part.type](part, collections, play);

	};

	methods.mousepoint = function mousepoint(part, collections, callback) {

		var position = part.position;

		//初回は始点のみ記録
		if (!beforeMousePosition) {
			beforeMousePosition = position;
			callback(collections);
		}

		var line = new Kinetic.Line({
			points: [beforeMousePosition.x / 2, beforeMousePosition.y / 2, position.x / 2, position.y / 2],
			stroke: 'red',
			strokeWidth: 2,
			lineCap: 'round',
			lineJoin: 'round'
		});

		layer.add(line);
		stage.add(layer);

		beforeMousePosition = position;

		setTimer(part, collections, callback);

	};

	methods.click = function click(part, collections, callback) {

		var position = part.position;
		var circle = new Kinetic.Circle({
			x: position.x / 2,
			y: position.y / 2,
			radius: 5,
			fill: 'red',
			stroke: 'black',
			strokeWidth: 2
		});

		layer.add(circle);
		stage.add(layer);

		setTimer(part, collections, callback);

	};

	methods.image = function image(part, collections, callback) {

		background.src = part.image;

		setTimer(part, collections, callback);

	};

	setTimer = function setTimer(part, collections, callback) {

		var timeDiff;

		if (!beforeTime) {

			beforeTime = part.time;
			callback(collections);

		} else {

			timeDiff = part.time - beforeTime;
			beforeTime = part.time;

			setTimeout(function(){
				callback(collections);
			}, timeDiff);

		}

	};

	return {
		play: play
	};

};