MyApp.Views.SessionListView = Backbone.View.extend({

	tmpl: _.template('' +
		'<% _.each(playList, function(play){ %>' +
		'<li data-sessionId="<%= play.sessionId %>">' +
		'<a href="#" class="sessionId"><%- play.sessionId %></a>' +
		'<span><%- play.createTimestamp%></span>' +
		'</li>' +
		'<% }); %>'),

	events: {
		'click a.sessionId ': 'getPlay'
	},

	initialize: function () {

		this.collection = new MyApp.Collections.SessionList();
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
		obj.sessionId = $(e.currentTarget).closest('li').data('sessionid');

		MyApp.events.trigger('get.session', obj);

	}

});