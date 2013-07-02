MyApp.Views.PlayerView = Backbone.View.extend({

	tmpl: _.template('' +
		'<div id="canvas"></div>' +
		''),

	initialize: function(){

		_.bindAll(this);

		this.render();

		MyApp.events.on('get.session', this.getPlay);

		this.collection = new MyApp.Collections.PlayList();

		this.listenTo(this.collection, 'reset', this.play);

		//MyApp.events.on('play', this.play);

	},

	getPlay: function(obj) {

		this.collection.sync(obj);

	},

	render: function(){

		this.$el.html(this.tmpl());

	},

	play: function(){

		var player = new MyApp.Utils.Player();

		player.play(this.collection.toJSON());

	}

});