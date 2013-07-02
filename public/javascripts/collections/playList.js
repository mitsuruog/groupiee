MyApp.Collections.PlayList = Backbone.Collection.extend({

	model: MyApp.Models.PlayParts,

	initialize: function() {

		_.bindAll(this);
		this.socket = MyApp.socket;

		this.socket.on('playList', this.addAll);

	},

	addAll: function(playList){

		console.log(playList);
		this.reset(playList);

		//MyApp.events.trigger('play');

	},

	sync: function(obj){

		this.socket.emit('playList', obj);

	}
});
