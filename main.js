var Ration = Backbone.Model.extend({

});

var Rations = Backbone.Collection.extend({
  model:Ration,
  localStorage: new Backbone.LocalStorage("Rations")
});

var rations = new Rations();

var FormView = Backbone.View.extend({

  template: $("form:first"),

  events: {
    "click #ration":          "addFields",
  },

  initialize: function() {
    this.index = 1;
    //this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    
  },

  addFields:function(){
    $('#ration').after('<div><input class="item" name="item' + this.index +'" type="text" /><input class="qty" name="qty' + this.index +'" type="text" /></div>');
    
    return false;
  }

});

var RationView = Backbone.View.extend({

  template: $("form:first"),

  events: {
   
  },

  initialize: function() {
    this.collection = rations;
    this.listenTo(this.collection, "change", this.render);
  }

  render: function() {
  
  }

});