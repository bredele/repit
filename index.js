
/**
 * Module dependencies.
 */

var cement = require('cement');
var Store = require('datastore');
var each = require('looping');
var index = require('indexof');


/**
 * Expose 'Repit'
 */

module.exports = Repit;


/**
 * Repit constructor.
 * 
 * @param {HTMLelement} el
 * @param {Object} model
 * @api public
 */

function Repit(data){
  //NOTE: there is some cleaning to do
  if(!(this instanceof Repit)) {
    if(data && data.mount) {

      // note: do better
      data.repeat = function(node, data) {
        var list = new Repit(new Store(data) || data.sandbox);
        list.list(node);
      };
    }

    // brick plugin 
    return function(ctx) {
      var list = new Repit(data || ctx);
      ctx.add('repeat', function(node) {
        // :s
        list.list(node);
      });
      return list;
    };
  }
  //TODO: should mixin store
  // this.store = new Store(store);
  this.store = data;
  this.items = [];
}


/**
 * Bind HTML element with store.
 * Takes the first child as an item renderer.
 * 
 * @param  {HTMLElement} node 
 * @api public
 */

Repit.prototype.list = function(node) {
  var first = node.children[0];
  var _this = this;

  this.node = node;
  this.clone = first.cloneNode(true);
  node.removeChild(first);


  this.store.on('change', function(key, value){
    var item = _this.items[key];
    if(item) {
      //NOTE: should we unbind in store when we reset?
      item.reset(value); //do our own emitter to have scope
    } else {
      //create item renderer
      _this.addItem(key, value);
    }
  });

  this.store.on('deleted', function(key, idx){
    _this.delItem(idx);
  });

  this.store.loop(this.addItem, this);
};


/**
 * Return index of node in list.
 * @param  {HTMLelement} node 
 * @return {Number}  
 * @api public
 */

Repit.prototype.indexOf = function(node) {
  return index(this.node.children, node);
};


/**
 * Loop over the list items.
 * Execute callback and pass store item.
 * 
 * @param  {Function} cb    
 * @param  {Object}   scope 
 * @api public
 */

Repit.prototype.loop = function(cb, scope) {
  each(this.items, function(idx, item){
    cb.call(scope, item.store);
  });
};


/**
 * Add list item.
 * 
 * @param {Object} obj
 * @api public
 */

Repit.prototype.add = function(obj) {
  //store push?
  //in the future, we could use a position
  this.store.set(this.store.data.length, obj);
};


/**
 * Set list item.
 * 
 * @param {HTMLElement|Number} idx 
 * @param {Object} obj
 * @api public
 */

Repit.prototype.set = function(idx, obj) {
  if(idx instanceof Element) idx = this.indexOf(idx);
  var item = this.items[idx].store;
  each(obj, function(key, val){
    item.set(key, val);
  });
};


/**
 * Delete item(s) in list.
 * 
 * @api public
 */

Repit.prototype.del = function(arg, scope) {
  //we should optimize store reset
  if(arg === undefined) return this.store.reset([]);
  if(typeof arg === 'function') {
    //could we handle that with inverse loop and store loop?
    var l = this.store.data.length;
    while(l--) {
      if(arg.call(scope, this.items[l].store)){
        this.store.del(l);
      }
    }
  }

  //ie8 doesn't support HTMLElement and instanceof with left assignment != object
  this.store.del(typeof arg === 'number' ? arg : this.indexOf(arg));
  //this.store.del(arg instanceof HTMLElement ? this.indexOf(arg): arg);
};


/**
 * Create item renderer from data.
 * @param  {Object} data 
 * @api private
 */

Repit.prototype.addItem = function(key, data) {
  var item = new ItemRenderer(this.clone, data);
  this.items[key] = item;
  this.node.appendChild(item.dom);
};


/**
 * Delete item.
 * @param  {Number} idx index
 * @api private
 */

Repit.prototype.delItem = function(idx) {
    var item = this.items[idx];
    item.unbind(this.node);
    this.items.splice(idx, 1);
    item = null; //for garbage collection
};


/**
 * Item renderer.
 * Represents the item that going to be repeated.
 * @param {HTMLElement} node 
 * @param {Store} data 
 * @api private
 */

function ItemRenderer(node, data){
  //NOTE: is it more perfomant to work with string?
  this.dom = node.cloneNode(true);
  this.store = new Store(data);
  cement(this.store).scan(this.dom);
}


/**
 * Unbind an item renderer from its ancestor.
 * @param  {HTMLElement} node 
 * @api private
 */

ItemRenderer.prototype.unbind = function(node) {
  //NOTE: is there something else to do to clean the memory?
  this.store.off();
  node.removeChild(this.dom);
};


/**
 * Reset iten renderer.
 * @param  {Object} data 
 * @api private
 */

ItemRenderer.prototype.reset = function(data) {
  this.store.reset(data);
};

