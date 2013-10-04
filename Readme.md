# each-plugin

  Loop over the items of an array store and append bound instances of that element. 


## Installation

    $ component install leafs/each-plugin

## Usage

template:

```html
  <ul data-list="each:">
    <li>{attr}</li>
  </ul>
```
  > the 'li' is repeated for each item into the store

view:

```js
  var Store = require('store');
  var EachPlugin = require('plugin');
  ...
  //store has to be array-like
  var store = new Store([{attr:'leafs'}]);
  ...
  //use leafs/view component
  view.add('list', new EachPlugin(store));

  ...
  //make the view alive and reset your store to update the view
```
   

## License

  MIT
