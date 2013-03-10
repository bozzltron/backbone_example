(function ($) {

  var Ration = Backbone.Model.extend({
    // This is where backbone will persist a model change to the server, i.e. /rations/{id}
    //urlRoot : '/rations'
  });

  var Rations = Backbone.Collection.extend({
    // This is where backbone will fetch data, i.e. get request to rations
    url: '/rations.json',
    model:Ration,
    //localStorage: new Backbone.LocalStorage("Rations")
  });

  window.rations = new Rations();

  var FormView = Backbone.View.extend({

    events: {
      "click #ration":          "addFields",
      "click #submit":          "save",
      "submit #ration_form":    "noop"
    },

    template: ''+
    '<form id="ration_form" class="form">' +
    '<input id="ration_name" type="text" placeholder="Name" />' +
    '<a id="ration" class="btn btn-primary" href="#">+ Ration</a>' +
    '<a style="display:none" id="submit" class="btn">Save</a>' +
    '</form>',

    initialize: function() {
      _.bindAll(this, 'render');
      console.log('init form');
      this.index = 1;
      this.collection = window.rations;
      this.listenTo(window.rations, "add", this.render);
      this.render();
    },

    noop : function(e){
      e.preventDefault();
      return false;
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    },

    addFields:function(){
      console.log('here');
      $('#ration').after('<div><input placeholder="item" class="item" name="item' + this.index + '" type="text" />' +
        '<input placeholder="Quantity" class="qty" name="qty' + this.index +'" type="text" /></div>');
      $('#submit').show();
      
      this.index = 1;
      return false;
    },

    save:function(){
      var ration = {
        name : $("#ration_name").val(),
        inventory : []
      };

      var items = [];
      $('.item').each(function(i, el){
        items.push($(el).val());
      });

      var qtys = [];
      $('.qty').each(function(i, el){
        qtys.push($(el).val());
      });  

      $.each(items, function(i, el){
        ration.inventory.push({
          item:items[i],
          qty:qtys[i]
        });
      });    

      console.log(ration);

      // Create triggers presistance to the server based on urlRoot in the model
      this.collection.create(new Ration(ration));
        
      return false;
    }

  });

  var RationView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this);
      console.log('init rations');
      this.collection = rations;
      this.listenTo(window.rations, "add", this.render);
      this.template = _.template($("#ration-template").html());
    },
      
    render: function() {
      console.log('render');
      var self = this;
      var html = this.template({rations:self.collection.toArray()});
      this.$el.html(html);
      return this;
    }
      
  });

  $(document).ready(function(){
    console.log('ready');

    // passing DOM elements into the views allows for reuse
    new FormView({el:$('#form-wrapper')});
    new RationView({el:$('#rations')})
  });

}(jQuery));
