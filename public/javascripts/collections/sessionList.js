MyApp.Collections.SessionList = Backbone.Collection.extend({

	model: MyApp.Models.Session,

	initialize: function() {

		_.bindAll(this);
		this.socket = MyApp.socket;

		this.socket.on('sessionList', this.addAll);

	},

	addAll: function(sessionList){

		console.log(sessionList);
		this.add(sessionList);

	},

	sync: function(){

		this.socket.emit('sessionList');

	}

});
