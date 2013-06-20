MyApp.Collections.PlayList = Backbone.Collection.extend({

	model: MyApp.Models.Play,

	initialize: function() {

		_.bindAll(this);
		this.socket = MyApp.socket;

		this.socket.on('playList', this.addAll);

	},

	addAll: function(playList){

		console.log(playList);
		this.add(playList);

	},

	sync: function(){

		this.socket.emit('playList');

	}

});
