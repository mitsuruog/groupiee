MyApp.App = Backbone.View.extend({

	el: '#main',

	initialize: function () {

		MyApp.socket = io.connect('/play');

		new MyApp.Views.PlayView();

	}

});

!(function () {
	new MyApp.App();
})();