(function ($) {

  var Ration = Backbone.Model.extend({
    // This is where backbone will persist a model change to the server, i.e. /rations/{id}
    //urlRoot : '/rations'
  });

  var Rations = Backbone.Collection.extend({
    // This is where backbone will fetch data, i.e. get request to rations
    url: '/rations',
    model:Ration,
    //localStorage: new Backbone.LocalStorage("Rations")
  });

  var rations = new Rations();

  var FormView = Backbone.View.extend({

    events: {
      "click #ration":          "addFields",
      "click #submit":          "save",
      "submit #ration_form":    "noop"
    },

    initialize: function() {
      _.bindAll(this);
      console.log('init');
      this.index = 1;
      this.collection = rations;
    },

    noop : function(e){
      e.preventDefault();
      return false;
    },

    render: function() {
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
      this.listenTo(this.collection, "change", this.render);
      this.template = _.template($("#ration-template").html());
    },
      
    render: function() {
      var html = this.template(this.collection.toArray());
      this.$el.html(html);
      return this;
    }
      
  });

  $(document).ready(function(){
    console.log('ready');

    // passing DOM elements into the views allows for reuse
    new FormView({el:$('#ration_form')});
    new RationView({el:$('#rations')})
  });

}(jQuery));
