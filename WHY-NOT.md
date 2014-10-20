# Why Not?

## Why don't you use `_` (underscores) instead of CamelCase for variable names ?

Most frequently used libraries use camelCase for (member) variables and CamelCase for class names. If you plan to use
them, your code would be a mix of underscores and variables without underscore.

## Why don't you `.bind(this)` on event handlers

The `that` variable always references the javascript instance of a class. So it's very easy to spot, what is `this`
and `that` in each context. With `.bind(this)` at some places it takes some time to figure what value `this` has. Also
it makes refactoring handlers into instance methods way easier.

Good:

``` javascript
Example.prototype.initializeEventListeners = function()
{
    var that = this;

	this.domElement.addEventListener("click", function()
	{
		// that is the Example instance now
		// this is the domElement
	}, true);

	this.domElement.addEventListener("click", function()
	{
		// that is the Example instance now
		// this is the domElement
	}, true);

	this.domElement.addEventListener("click", function()
	{
		// that is the Example instance now
		// this is the domElement
		this.otherDomElement.addEventListener("click", function()
		{
			// that is the Example instance now
			// this is the otherDomElement
		}, true);
	}, true);
}
```

Let's take the following BAD example:

``` javascript
Example.prototype.initializeEventListeners = function()
{
	this.domElement.addEventListener("click", function()
	{
		// this is the Example instance now
	}.bind(this), true);

	this.domElement.addEventListener("click", function()
	{
		// this is the domElement now
	}, true);

	this.domElement.addEventListener("click", function()
	{
		this.otherDomElement.addEventListener("click", function()
		{
			// this is domElement but not otherDomElement now
		}.bind(this), true);
		// because bind is missing in the next line
	}, true);
}
```

## Why don't you use `self` as reference to the function?

We decided to use `that` as reference, because `self` is already pre-defined as `window`. So if you forget to define
`var self = this` it would use `window` instead!

So if you would forget `var self = this`:

``` javascript
self.getSelection() // would call window.getSelection()
```

But since we use `var that = this`, the following would happen if we vorget `var that = this`:

``` javascript
that.getSelection() will throw "ReferenceError: that is not defined"
```
