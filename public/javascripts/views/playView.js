MyApp.Views.PlayView = Backbone.View.extend({

	el: '#main',

	initialize: function () {

		//Mediatorオブジェクト作成
		MyApp.events = {};
		_.extend(MyApp.events, Backbone.Events);

		this.player = new MyApp.Views.PlayerView({
			el: this.$el.find('#left-container')
		});

		this.playList = new MyApp.Views.SessionListView({
			el: this.$el.find('#right-container')
		});
	}

});