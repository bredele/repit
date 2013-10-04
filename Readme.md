# each-plugin

  Loop over the items of an array store and append bound instances of that element. 


## Installation

    $ component install leafs/each-plugin

## Usage

The following example use the component [view](https://github.com/leafs/view) and [store](https://github.com/leafs/store).

template:

```html
  <ul class="list" data-list="each:">
    <li>{attr}</li>
  </ul>
```
  > the 'li' is repeated for each item into the store

view:

```js
  var Store = require('store');
  var View = require('view');
  var EachPlugin = require('plugin');

  //store has to be array-like
  var store = new Store([{attr:'leafs'}]);

  var view = new View();
  view.template(document.querySelector('.list'));
  
  //use leafs/view component
  view.add('list', new EachPlugin(store));
  view.alive();

  //update your view
  view.reset([{attr:'bredele'},{attr:'Calgary'}]);
```
   

## License

  MIT
