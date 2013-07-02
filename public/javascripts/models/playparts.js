MyApp.Models.PlayParts = Backbone.Model.extend({

	set: function(attrs, options){

		if(attrs.timestamp){
			attrs.time = new Date(attrs.timestamp).getTime();
		}

		return Backbone.Model.prototype.set.call(this, attrs, options);

	}

});