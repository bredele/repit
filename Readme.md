# Repit

 > repeat it

  Loop over the items of an array store and append bound instances of that element.


  Repit has been built for **[brick](https://github.com/bredele/brick)** and **[wall](https://github.com/bredele/wall)** but also work as a standalone library.


## Installation

with [component](http://github.com/component/component):

    $ component install bredele/repit

with [browserify](http://browserify.org):

    $ npm install repit



## Standalone

  Repit uses **[cement](http://github.com/bredele/cement)** to sync each item with a **[datastore](http://github.com/bredele/datastore)**.

HTML:
```html
<ul>
  <li>{{ label }}</li>
</ul>
```

JavaScript:
```js
var Store = require('datastore');
var Repeat = require('repit');

var data = new Store([{
  label: 'bredele'
}, {
  label: 'Calgary'
}
]);


var items = new Repeat(data);
items.list(ul);

```

Result:
```html
<ul>
  <li>bredele</li>
  <li>Calgary</li> 
</ul>
```

See [example](https://github.com/bredele/repeat-brick/tree/master/examples/standalone.html).

## Brick

Directive:
```html
<ul repeat>
  <li>{{ label }}</li>
</ul>
```

Brick:
```js
var brick = require('brickjs');
var repeat = require('repit');

var view = brick(ul)
  .use(repeat())
  .build();
```

  `repeat` will automatically use the brick data if nothing is passed.

update the ui :

```js
view.set(0, {
  label: 'something'
});

view.reset([{
  label: 'bredele',
}, {
  label: 'Calgary'
}])
```


See [example](https://github.com/bredele/repeat-brick/tree/master/examples/brick.html).

## Wall

```js
var repeat = require('repit');
var wall = require('wall');

var app = wall();
app.use(repeat);

app.repeat(node, data);
```
See [example](https://github.com/bredele/repeat-brick/tree/master/examples/wall.html).

## License

  MIT
