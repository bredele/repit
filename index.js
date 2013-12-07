var Binding = require('binding'),
    Store = require('store'),
    index = require('indexof');



/**
 * Expose 'event-plugin'
 */

module.exports = List;


/**
 * List constructor.
 * 
 * @param {HTMLelement} el
 * @param {Object} model
 * @api public
 */

function List(store){
  this.store = store;
  this.items = [];
}


/**
 * Bind HTML element with store.
 * Takes the first child as an item renderer.
 * 
 * @param  {HTMLElement} node 
 * @api public
 */

List.prototype.default =  
List.prototype.list = function(node) {
  var first = node.children[0],
      _this = this;

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

  store.loop(this.addItem, this);
};

/**
 * Return index of node in list.
 * @param  {HTMLelement} node 
 * @return {Number}  
 */

List.prototype.indexOf = function(node) {
  //works if we use plugin only once (this.node could be in constructor)
  var children = [].slice.call(this.node.children);
  return index(children, node);
};


/**
 * Delete item in list.
 *
 * 
 * @api public
 */
List.prototype.del = function(arg) {
  if(arg === undefined) this.reset([]);
  this.store.del(arg instanceof HTMLElement ? this.indexOf(arg): arg);
};


/**
 * Create item renderer from data.
 * @param  {Object} data 
 * @api private
 */

List.prototype.addItem = function(key, data) {
  var item = new ItemRenderer(this.clone, data);
  this.items[key] = item;
  this.node.appendChild(item.dom);
};


/**
 * Delete item.
 * @param  {Number} idx index
 * @api private
 */

List.prototype.delItem = function(idx) {
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
  this.binding = new Binding(this.store); //we have to have a boolean parameter to apply interpolation &|| plugins
  this.binding.apply(this.dom);
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

