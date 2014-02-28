# Repeat

  Loop over the items of an array store and append bound instances of that element.
  `Repeat` is also a plugin for [lego](https://github.com/bredele/lego).


## Installation

with [component](http://github.com/component/component):

    $ component install bredele/repeat-bricks

with [nodejs](http://nodejs.org):

    $ npm install repeat-bricks

## Usage

First, add the plugin to your view (see [lego](https://github.com/bredele/lego) to know more about views):

```js
  var repeat = require('repeat-bricks');

  view.add('repeat', repeat(view));
```
   
### Basic

```html
  <ul repeat>
    <li>{{ attr }}</li>
  </ul>
```
  > the 'li' is repeated for each item into the store (view is a store)

update the store :

```js
view.reset([{
  attr: 'bredele',
}, {
  attr: 'Calgary'
}])
```
   
and here's the result:

```html
  <ul list>
    <li>bredele</li>
    <li>Calgary</li>    
  </ul>
```

See [example](https://github.com/bredele/repeat-brick/tree/master/examples).

## License

  MIT
