# nikita.js

This is our methodology how to write efficient and scalable Javascript for big websites.

Latest Release: [![GitHub version](https://badge.fury.io/gh/nikita-kit%2Fnikita-js.png)](https://github.com/nikita-kit/nikita-js/releases)

If you want to start a new project from scratch, try [nikita.kickstarter](https://github.com/nikita-kit/nikita-kickstarter).
If you're interested in HTML patterns, code snippets and best practices, try [nikita.html](https://github.com/nikita-kit/nikita-html).
If you're interested in CSS patterns, code snippets and best practices, try [nikita.css](https://github.com/nikita-kit/nikita-css).

## Contents

This part of nikita called `nikita.js` is **totally work in progress**. Most coding style rules are conclusions of many years
of web development expirience. For the most basic ones, please see [Javascript the good parts](http://www.amazon.com/exec/obidos/ASIN/0596517742), too.

## Javascript modules

To make modular javascript possible, we use [AMD](http://requirejs.org/docs/whyamd.html) and [requirejs](http://requirejs.org/) as module loader.

A basic module (located at `js/sub/folder/Example.js`) looks like this:

``` javascript
define('sub/folder/Example', ['logging'], function(logging)
{
	var Example = function()
	{
		logging.applyLogging(this, 'Example');

		this.initializeEventListeners();
	};

	Example.prototype.initializeEventListeners = function()
	{
		var that = this;

		// use that to access variables instead of .bind on each function
	};

	return Example;
});
```

Since it uses [logging.js](https://github.com/DracoBlue/logging-js), the call at: `logging.applyLogging(this, 'Example');`
will initialize tracing for all calls (even `initializeEventListeners`). Additionally there will be methods like `logDebug`,
`logError` and `logWarn` available on the instance.

So you might call:

``` javascript
this.logError('Hai!');
// [Example] Error: Hai!
```

## Defining functions

Good:
``` javascript
var myFunction = function()
{
};
```

Bad:
``` javascript
function myFunction()
{
};
```

## Indenting Variables

Good:
``` javascript
var foo = "some content";
var otherFoo = "some other content";
```

Bad:
``` javascript
var foo      = "some content";
var otherFoo = "some other content";
```
Also bad:
``` javascript
var foo = "some content",
    otherFoo = "some other content";
```

## Defining `classes`

If you define a class add `var ClassName = function() {}` and use `ClassName.prototype.myFunction` to add functions
afterwards.

Bad:
``` javascript
ClassName.prototype = {
    myFunction: function()
    {
    },
    myFunction2: function()
    {
    }
};
```

This will override the entire prototype. If you want to disable the myFunction2 for a second, you have to mind the `,` of
myFunction. This is way easier if you assign each function on its own to the prototype, like in the next example.

Good:
``` javascript
ClassName.prototype.myFunction = function()
{
};

// ClassName.prototype.myFunction2 = function()
// {
// };
```

## Questions?

If you're asking yourself _»Why not …?«_ have a look at my [WHY-NOT.md](https://github.com/nikita-kit/nikita-js/blob/master/WHY-NOT.md) file. There I might answer some common questions. :)

## License

nikita.js is licensed under [CC0](http://creativecommons.org/publicdomain/zero/1.0/): Public Domain Dedication.
