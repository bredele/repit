# List

  Loop over the items of an array store and append bound instances of that element. List is
  also a plugin for the [binding](https://github.com/bredele/binding) component.


## Installation

    $ component install bredele/list

## Plugin usage

The following example use the components [view](https://github.com/bredele/view) and [store](https://github.com/bredele/store).

template:

```html
  <ul class="list" list>
    <li>{attr}</li>
  </ul>
```
  > the 'li' is repeated for each item into the store

view:

```js
  var Store = require('store');
  var View = require('view');
  var List = require('list');

  //store has to be array-like
  var store = new Store([{attr:'olivier'}]);

  var view = new View();
  view.html(document.querySelector('.list'));
  
  //name your plugin
  view.attr('list', new List(store));

  //apply bindings
  view.alive();

  //update your store
  store.reset([{attr:'bredele'},{attr:'Calgary'}]);
```
   
Here's the result:

```html
  <ul class="list" list>
    <li>bredele</li>
    <li>Calgary</li>    
  </ul>
```

## License

  MIT
