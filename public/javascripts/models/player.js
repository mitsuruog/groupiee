MyApp.Models.Player = Backbone.Model.extend({

	initialize: function() {

		_.bindAll(this);
		this.socket = MyApp.socket;

		this.socket.on('play', this.set);

	},

	sync: function(){

		this.socket.emit('play', this.sessionId);

	},

	set: function(attrs, options){

		return Backbone.Model.prototype.set.call(this, attrs, options);
	}

});
