MyApp.Models.Play = Backbone.Model.extend({

	set: function(attrs, options){
		if (attrs.createTimestamp) {
			attrs.createTimestamp = moment(attrs.createTimestamp).format('YYYY/MM/DD HH:MM:SS');
		}

		return Backbone.Model.prototype.set.call(this, attrs, options);
	}

});