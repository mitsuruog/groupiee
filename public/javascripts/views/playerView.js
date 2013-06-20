MyApp.Views.PlayerView = Backbone.View.extend({

	tmpl: _.template('' +
		'<canvas width="500px" height="500px"></canvas>' +
		''),

	initialize: function(){

		_.bindAll(this);

		MyApp.events.on('play', this.getPlay);

	},

	getPlay: function(obj) {

		this.model = new MyApp.Models.Player(obj);
		this.listenTo(this.model, 'add', this.render);
		this.model.sync();

	},

	render: function(){

		this.$el.html(this.tmpl());

	}

});