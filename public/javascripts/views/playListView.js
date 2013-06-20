MyApp.Views.PlayListView = Backbone.View.extend({

	tmpl: _.template('' +
		'<% _.each(playList, function(play){ %>' +
		'<li data-playId="<%= play._id %>">' +
		'<a href="#" class="playId"><%- play.sessionId %></a>' +
		'<span><%- play.createTimestamp%></span>' +
		'</li>' +
		'<% }); %>'),

	events: {
		'click a.playId ': 'getPlay'
	},

	initialize: function () {

		this.collection = new MyApp.Collections.PlayList();
		this.collection.sync();

		this.listenTo(this.collection, 'add', this.render);

	},

	render: function () {

		this.$el.html(this.tmpl({
			playList: this.collection.toJSON()
		}));

	},

	getPlay: function(e){

		e.preventDefault();

		var obj = {};
		obj.playId = this.$el.find('li').data('playid');

		MyApp.events.trigger('play', obj);

	}

});