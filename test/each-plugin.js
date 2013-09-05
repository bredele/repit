var assert = require('assert');
var Plugin = require('each-plugin');
var Widget = require('widget');
var Store = require('store');


describe('initialization', function(){
  describe('collection', function(){
    var widget = null,
        store = null,
        nodes = null;

    beforeEach(function(){
      widget = new Widget();
      store = new Store([{name:'olivier'}, {name:'bruno'}, {name:'sebastien'}]);
      //TODO:bug if you don't declare ':' becaseu of split of undefined
      widget.template('<ul data-model="each:"><li>{name}</li></ul>', store);
      widget.plugin('model', new Plugin(store));
      widget.alive();
      nodes = widget.dom.childNodes;
    });

    it('should repeat the closest child node for each property of the model', function(){
      assert(3 === nodes.length);
    });

    it('should apply substitution binding on each new item', function(){
      assert('olivier' === nodes[0].innerHTML);
      assert('bruno' === nodes[1].innerHTML);
      assert('sebastien' === nodes[2].innerHTML);     
    });

    it('should update items with data', function(){
      assert('olivier' === nodes[0].innerHTML);
      store.set(0, {
        name:'bredele'
      });
      assert('bredele' === nodes[0].innerHTML);
    });

    it('should reset with less items', function(){
      store.reset([{name:'amy'}, {name:'wendy'}]);
      assert(2 === nodes.length);
      assert('amy' === nodes[0].innerHTML);
      assert('wendy' === nodes[1].innerHTML);
    });

    it('should reset with more items', function(){
      store.reset([{name:'amy'}, {name:'wendy'}, {name:'nicolas'}, {name:'benjamin'}]);
      assert(4 === nodes.length);
      assert('amy' === nodes[0].innerHTML);
      assert('wendy' === nodes[1].innerHTML);
      assert('nicolas' === nodes[2].innerHTML);
      assert('benjamin' === nodes[3].innerHTML);  
    });

  });
});
