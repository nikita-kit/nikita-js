# nikita.js

This is our methodology how to write efficient and scalable Javascript for big websites.

Latest Release: [![GitHub version](https://badge.fury.io/gh/nikita-kit%2Fnikita-js.png)](https://github.com/nikita-kit/nikita-js/releases)

If you want to start a new project from scratch, try [nikita.generator](https://github.com/nikita-kit/generator-nikita).
If you're interested in HTML patterns, code snippets and best practices, try [nikita.html](https://github.com/nikita-kit/nikita-html).
If you're interested in CSS patterns, code snippets and best practices, try [nikita.css](https://github.com/nikita-kit/nikita-css).

## Contents

This part of nikita called `nikita.js` describes our prefered Javascript conding style. 
This guide is mainly based on the the [airbnb style guide](https://github.com/airbnb/javascript) which offers a great rule set for modern javascript coding. 
However, we changed small things:
 * indent with 4 spaces
 * max line length of 150 characters
 * don't use .bind(this)
 * added a few rules (basic module, logging)
 * removed/relaxed some minor rules
 * changed the order to have important sections on top


<a name="table-of-contents"></a>
## Style Guide Contents

  1. [Modules](#modules)
  1. [Naming Conventions](#naming-conventions)
  1. [Whitespace](#whitespace)
  1. [Commas](#commas)
  1. [Semicolons](#semicolons)
  1. [Types](#types)
  1. [References](#references)
  1. [Objects](#objects)
  1. [Arrays](#arrays)
  1. [Destructuring](#destructuring)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Arrow Functions](#arrow-functions)
  1. [Classes & Constructors](#classes--constructors)
  1. [Iterators and Generators](#iterators-and-generators)
  1. [Properties](#properties)
  1. [Variables](#variables)
  1. [Hoisting](#hoisting)
  1. [Comparison Operators & Equality](#comparison-operators--equality)
  1. [Blocks](#blocks)
  1. [Comments](#comments)
  1. [Type Casting & Coercion](#type-casting--coercion)
  1. [Accessors](#accessors)
  1. [Events](#events)
  1. [jQuery](#jquery)
  1. [Resources](#resources)
  1. [License](#license)


## Modules

  <a name="modules--use-them"></a>
  - [1.1](#modules--use-them) Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.

    > Why? Modules are the future, let's start using the future now.

    ```javascript
    // bad
    const StyleGuide = require('./StyleGuide');
    module.exports = StyleGuide.es6;

    // ok
    import StyleGuide from './StyleGuide';
    export default StyleGuide.es6;

    // best
    import { es6 } from './StyleGuide';
    export default es6;
    ```


  <a name="modules--basic"></a>
  - [1.2](#modules--basic) A basic module (located at `js/sub/folder/Example.js`) looks like this:

    ``` javascript
    import logging from 'node-logging-js';

    class Example {
        constructor(options) {
            logging.applyLogging(this, 'Example');
            this.logDebug('options:', options);

            this.initializeEventListeners();
        }

        initializeEventListeners() {
        }
    }

    export default Example;
    ```

  <a name="modules--logging"></a>
  - [1.3](#modules--logging) Since it uses [logging.js](https://github.com/DracoBlue/logging-js), the call at: `logging.applyLogging(this, 'Example');` will initialize tracing for all calls (even `initializeEventListeners`). Additionally there will be methods like `logDebug`, `logError` and `logWarn` available on the instance.

    ``` javascript
    this.logError('Not allowed!');
    // Console Output:
    // [Example] Error: Not allowed!
    ```

  <a name="modules--no-wildcard"></a>
  - [1.4](#modules--no-wildcard) Do not use wildcard imports.

    > Why? This makes sure you have a single default export.

    ```javascript
    // bad
    import * as StyleGuide from './StyleGuide';

    // good
    import StyleGuide from './StyleGuide';
    ```

  <a name="modules--no-export-from-import"></a>
  - [1.5](#modules--no-export-from-import) And do not export directly from an import.

    > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

    ```javascript
    // bad
    // filename es6.js
    export { es6 as default } from './StyleGuide';

    // good
    // filename es6.js
    import { es6 } from './StyleGuide';
    export default es6;
    ```

  <a name="modules--no-duplicate-imports"></a>
  - [1.6](#modules--no-duplicate-imports) Only import from a path in one place.
 eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)
    > Why? Having multiple lines that import from the same path can make code harder to maintain.

    ```javascript
    // bad
    import foo from 'foo';
    // … some other imports … //
    import { named1, named2 } from 'foo';

    // good
    import foo, { named1, named2 } from 'foo';

    // good
    import foo, {
        named1,
        named2,
    } from 'foo';
    ```

  <a name="modules--no-mutable-exports"></a>
  - [1.7](#modules--no-mutable-exports) Do not export mutable bindings.
 eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
    > Why? Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.

    ```javascript
    // bad
    let foo = 3;
    export { foo };

    // good
    const foo = 3;
    export { foo };
    ```

  <a name="modules--prefer-default-export"></a>
  - [1.8](#modules--prefer-default-export) In modules with a single export, prefer default export over named export.
 eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

    ```javascript
    // bad
    export function foo() {}

    // good
    export default function foo() {}
    ```

  <a name="modules--imports-first"></a>
  - [1.9](#modules--imports-first) Put all `import`s above non-import statements.
 eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)
    > Why? Since `import`s are hoisted, keeping them all at the top prevents surprising behavior.

    ```javascript
    // bad
    import foo from 'foo';
    foo.init();

    import bar from 'bar';

    // good
    import foo from 'foo';
    import bar from 'bar';

    foo.init();
    ```

  <a name="modules--multiline-imports-over-newlines"></a>
  - [1.10](#modules--multiline-imports-over-newlines) Multiline imports should be indented just like multiline array and object literals.

    > Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.

    ```javascript
    // bad
    import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

    // good
    import {
        longNameA,
        longNameB,
        longNameC,
        longNameD,
        longNameE,
    } from 'path';
    ```

  <a name="modules--no-webpack-loader-syntax"></a>
  - [1.11](#modules--no-webpack-loader-syntax) Disallow Webpack loader syntax in module import statements.
 eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)
    > Why? Since using Webpack syntax in the imports couples the code to a module bundler. Prefer using the loader syntax in `webpack.config.js`.

    ```javascript
    // bad
    import fooSass from 'css!sass!foo.scss';
    import barCss from 'style!css!bar.css';

    // good
    import fooSass from 'foo.scss';
    import barCss from 'bar.css';
    ```

**[⬆ back to top](#table-of-contents)**



## Naming Conventions

  <a name="naming--descriptive"></a>
  - [2.1](#naming--descriptive) Avoid single letter names and abbreviations. Be descriptive with your naming. eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

    ```javascript
    // bad
    function tglBtn() {
        // ...
    }

    // bad
    function q() {
        // ...
    }

    // good
    function query() {
        // ...
    }
    ```

  <a name="naming--camelCase"></a>
  - [2.2](#naming--camelCase) Use camelCase when naming objects, functions, and instances. eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html) 

    > Why? Most frequently used libraries use camelCase for (member) variables and PascalCase for class names.

    ```javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

  <a name="naming--PascalCase"></a>
  - [2.3](#naming--PascalCase) Use PascalCase only when naming constructors or classes. eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html) 
  
    > Why? Most frequently used libraries use camelCase for (member) variables and PascalCase for class names.
  
    ```javascript
    // bad
    function user(options) {
        this.name = options.name;
    }

    const bad = new user({
        name: 'nope',
    });

    // good
    class User {
        constructor(options) {
            this.name = options.name;
        }
    }

    const good = new User({
        name: 'yup',
    });
    ```

  <a name="naming--leading-underscore"></a>
  - [2.4](#naming--leading-underscore) Do not use trailing or leading underscores. eslint: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html) 

    > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won't count as breaking, or that tests aren't needed. tl;dr: if you want something to be “private”, it must not be observably present.

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // good
    this.firstName = 'Panda';
    ```

  <a name="naming--self-this"></a>
  - [2.5](#naming--self-this) Don't use the bind function. Use arrow functions or save references to `this` in `that`.

    > Why? The `that` variable always references the javascript instance of a class. So it's very easy to spot, what is `this`
           and `that` in each context. With `.bind(this)` at some places it takes some time to figure what value `this` has. 
           We decided to use `that` as reference, because `self` is already pre-defined as `window`. So if you forget to define
           it would use `window` instead!
  
    ```javascript
    // bad
    function foo() {
        console.log(this);
    }.bind(this);

    // bad
    function foo() {
        const self = this;
        return function () {
            console.log(self);
        };
    }

    // good
    function foo() {
        const that = this;
        return function () {
            console.log(that);
        };
    }

    // best
    function foo() {
        return () => {
            console.log(this);
        };
    }
    ```

  <a name="naming--filename-matches-export"></a>
  - [2.6](#naming--filename-matches-export) A base filename should exactly match the name of its default export.

    ```javascript
    // file 1 contents
    class CheckBox {
        // ...
    }
    export default CheckBox;

    // file 2 contents
    export default function fortyTwo() { return 42; }

    // file 3 contents
    export default function insideDirectory() {}

    // in some other file
    // bad
    import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
    import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
    import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

    // bad
    import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
    import forty_two from './forty_two'; // snake_case import/filename, camelCase export
    import inside_directory from './inside_directory'; // snake_case import, camelCase export
    import index from './inside_directory/index'; // requiring the index file explicitly
    import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

    // good
    import CheckBox from './CheckBox'; // PascalCase export/import/filename
    import fortyTwo from './fortyTwo'; // camelCase export/import/filename
    import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js
    ```

  <a name="naming--camelCase-default-export"></a>
  - [2.7](#naming--camelCase-default-export) Use camelCase when you export-default a function. Your filename should be identical to your function's name.

    ```javascript
    function makeStyleGuide() {
        // ...
    }

    export default makeStyleGuide;
    ```

  <a name="naming--PascalCase-singleton"></a>
  - [2.8](#naming--PascalCase-singleton) Use PascalCase when you export a constructor / class / singleton / function library / bare object.

    ```javascript
    const StyleGuide = {
        es6: {
        },
    };

    export default StyleGuide;
    ```

  <a name="naming--Acronyms-and-Initialisms"></a>
  - [2.9](#naming--Acronyms-and-Initialisms) Acronyms and initialisms should always be all capitalized, or all lowercased.

    > Why? Names are for readability, not to appease a computer algorithm.

    ```javascript
    // bad
    import SmsContainer from './containers/SmsContainer';

    // bad
    const HttpRequests = [
        // ...
    ];

    // good
    import SMSContainer from './containers/SMSContainer';

    // good
    const HTTPRequests = [
        // ...
    ];

    // best
    import TextMessageContainer from './containers/TextMessageContainer';

    // best
    const Requests = [
        // ...
    ];
    ```

**[⬆ back to top](#table-of-contents)**



## Whitespace

  <a name="whitespace--spaces"></a>
  - [3.1](#whitespace--spaces) Use 4 space characters (soft tabs) to indent. eslint: [`indent`](http://eslint.org/docs/rules/indent.html) 
  
    ```javascript
    // bad
    function foo() {
    ∙∙let name;
    }

    // bad
    function bar() {
    ⇥let name;
    }

    // good
    function baz() {
    ∙∙∙∙let name;
    }
    ```

  <a name="whitespace--before-blocks"></a>
  - [3.2](#whitespace--before-blocks) Place 1 space before the leading brace. eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html) 

    ```javascript
    // bad
    function test(){
        console.log('test');
    }

    // good
    function test() {
        console.log('test');
    }

    // bad
    dog.set('attr',{
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });
    ```

  <a name="whitespace--around-keywords"></a>
  - [3.3](#whitespace--around-keywords) Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations. eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html) 
  
    ```javascript
    // bad
    if(isJedi) {
        fight ();
    }

    // good
    if (isJedi) {
        fight();
    }

    // bad
    function fight () {
        console.log ('Swooosh!');
    }

    // good
    function fight() {
        console.log('Swooosh!');
    }
    ```

  <a name="whitespace--infix-ops"></a>
  - [3.4](#whitespace--infix-ops) Set off operators with spaces. eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html) 

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```

  <a name="whitespace--newline-at-end"></a>
  - [3.5](#whitespace--newline-at-end) End files with a single newline character. eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

    ```javascript
    // bad
    import { es6 } from './StyleGuide';
    // ...
    export default es6;
    ```

    ```javascript
    // bad
    import { es6 } from './StyleGuide';
    // ...
    export default es6;↵
    ↵
    ```

    ```javascript
    // good
    import { es6 } from './StyleGuide';
    // ...
    export default es6;↵
    ```

  <a name="whitespace--chains"></a>
  - [3.6](#whitespace--chains) Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which
    emphasizes that the line is a method call, not a new statement. eslint: [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property)

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
        find('.selected').
            highlight().
            end().
        find('.open').
            updateCount();

    // good
    $('#items')
        .find('.selected')
            .highlight()
            .end()
        .find('.open')
            .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
        .enter().append('svg:svg')
            .classed('led', true)
            .attr('width', (radius + margin) * 2)
        .append('svg:g')
            .attr('transform', `translate(${radius + margin},${radius + margin})`)
            .call(tron.led);

    // good
    const leds = stage.selectAll('.led').data(data);
    ```

  <a name="whitespace--after-blocks"></a>
  - [3.7](#whitespace--after-blocks) Leave a blank line after blocks and before the next statement. 

    ```javascript
    // bad
    if (foo) {
        return bar;
    }
    return baz;

    // good
    if (foo) {
        return bar;
    }

    return baz;

    // bad
    const obj = {
        foo() {
        },
        bar() {
        },
    };
    return obj;

    // good
    const obj = {
        foo() {
        },

        bar() {
        },
    };

    return obj;

    // bad
    const arr = [
        function foo() {
        },
        function bar() {
        },
    ];
    return arr;

    // good
    const arr = [
        function foo() {
        },

        function bar() {
        },
    ];

    return arr;
    ```

  <a name="whitespace--in-parens"></a>
  - [3.8](#whitespace--in-parens) Do not add spaces inside parentheses. eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html) 
  
    ```javascript
    // bad
    function bar( foo ) {
        return foo;
    }

    // good
    function bar(foo) {
        return foo;
    }

    // bad
    if ( foo ) {
        console.log(foo);
    }

    // good
    if (foo) {
        console.log(foo);
    }
    ```

  <a name="whitespace--in-brackets"></a>
  - [3.9](#whitespace--in-brackets) Do not add spaces inside brackets. eslint: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html) 

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

  <a name="whitespace--in-braces"></a>
  - [3.10](#whitespace--in-braces) Add spaces inside curly braces. eslint: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html) 
  
    ```javascript
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };
    ```

  <a name="whitespace--max-len"></a>
  - [3.11](#whitespace--max-len) Avoid having lines of code that are longer than 150 characters (including whitespace). Note: per [above](#strings--line-length), long strings are exempt from this rule, and should not be broken up. eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html)
  
    > Why? This ensures readability and maintainability.

    ```javascript
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    const foo = jsonData
        && jsonData.foo
        && jsonData.foo.bar
        && jsonData.foo.bar.baz
        && jsonData.foo.bar.baz.quux
        && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
        method: 'POST',
        url: 'https://airbnb.com/',
        data: { name: 'John' },
    })
        .done(() => console.log('Congratulations!'))
        .fail(() => console.log('You have failed this city.'));
    ```

  <a name="whitespace--align"></a>
  - [3.12](#whitespace--align) Do not align variable declarations or properties. eslint: [`no-multi-spaces`](http://eslint.org/docs/rules/no-multi-spaces)
  
    ```javascript
    // bad
    const foo      = "some content";
    const otherFoo = "some other content";
    const bar = {
        test:       123,
        myLongTest: 456
    }

    // good
    const foo = "some content";
    const otherFoo = "some other content";
    const bar = {
        test: 123,
        myLongTest: 456
    }
    ```

**[⬆ back to top](#table-of-contents)**


## Commas

<a name="commas--leading-trailing"></a>
  - [4.1](#commas--leading-trailing) Leading commas: **Nope.** eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html) 
  
    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
        once,
        upon,
        aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthYear: 1815,
        superPower: 'computers',
    };
    ```

  <a name="commas--dangling"></a>
  - [4.2](#commas--dangling) Additional trailing comma: **Yup.** eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html) 
  
    > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don't have to worry about the [trailing comma problem](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) in legacy browsers.

    ```diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```javascript
    // bad
    const hero = {
        firstName: 'Dana',
        lastName: 'Scully'
    };

    const heroes = [
        'Batman',
        'Superman'
    ];

    // good
    const hero = {
        firstName: 'Dana',
        lastName: 'Scully',
    };

    const heroes = [
        'Batman',
        'Superman',
    ];

    // bad
    function createHero(
        firstName,
        lastName,
        inventorOf
    ) {
        // does nothing
    }

    // good
    function createHero(
        firstName,
        lastName,
        inventorOf,
    ) {
        // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
        firstName,
        lastName,
        inventorOf,
        ...heroArgs
    ) {
        // does nothing
    }

    // bad
    createHero(
        firstName,
        lastName,
        inventorOf
    );

    // good
    createHero(
        firstName,
        lastName,
        inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
        firstName,
        lastName,
        inventorOf,
        ...heroArgs
    );
    ```

**[⬆ back to top](#table-of-contents)**


## Semicolons

  <a name="semicolons--required"></a>
  - [5.1](#semicolons--required) **Yup.** eslint: [`semi`](http://eslint.org/docs/rules/semi.html) 

    ```javascript
    // bad
    (function () {
        const name = 'Skywalker'
        return name
    })()

    // good
    (function () {
        const name = 'Skywalker';
        return name;
    }());

    // good, but legacy (guards against the function becoming an argument when two files with IIFEs are concatenated)
    ;((() => {
        const name = 'Skywalker';
        return name;
    })());
    ```

    [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214%237365214).

**[⬆ back to top](#table-of-contents)**


## Types

  <a name="types--primitives"></a>
  - [6.1](#types--primitives) **Primitives**: When you access a primitive type you work directly on its value.

    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```javascript
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```

  <a name="types--complex"></a>
  - [6.2](#types--complex)  **Complex**: When you access a complex type you work on a reference to its value.

    + `object`
    + `array`
    + `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-of-contents)**

## References

  <a name="references--prefer-const"></a>
  - [7.1](#references--prefer-const) Use `const` for all of your references; avoid using `var`. eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

    > Why? This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

  <a name="references--disallow-var"></a>
  - [7.2](#references--disallow-var) If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](http://eslint.org/docs/rules/no-var.html) 
  
    > Why? `let` is block-scoped rather than function-scoped like `var`.

    ```javascript
    // bad
    var count = 1;
    if (true) {
        count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
        count += 1;
    }
    ```

  <a name="references--block-scope"></a>
  - [7.3](#references--block-scope) Note that both `let` and `const` are block-scoped.

    ```javascript
    // const and let only exist in the blocks they are defined in.
    {
        let a = 1;
        const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

**[⬆ back to top](#table-of-contents)**

## Objects

  <a name="objects--no-new"></a>
  - [8.1](#objects--no-new) Use the literal syntax for object creation. eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

  <a name="es6-computed-properties"></a>
  - [8.2](#es6-computed-properties) Use computed property names when creating objects with dynamic property names.

    > Why? They allow you to define all the properties of an object in one place.

    ```javascript

    function getKey(k) {
        return `a key named ${k}`;
    }

    // bad
    const obj = {
        id: 5,
        name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
        id: 5,
        name: 'San Francisco',
        [getKey('enabled')]: true,
    };
    ```

  <a name="es6-object-shorthand"></a>
  - [8.3](#es6-object-shorthand) Use object method shorthand. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html) 

    ```javascript
    // bad
    const atom = {
        value: 1,

        addValue: function (value) {
            return atom.value + value;
        },
    };

    // good
    const atom = {
        value: 1,

        addValue(value) {
            return atom.value + value;
        },
    };
    ```

  <a name="es6-object-concise"></a>
  - [8.4](#es6-object-concise) Use property value shorthand. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

    > Why? It is shorter to write and descriptive.

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
        lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
    };
    ```

  <a name="objects--grouped-shorthand"></a>
  - [8.5](#objects--grouped-shorthand) Group your shorthand properties at the beginning of your object declaration.

    > Why? It's easier to tell which properties are using the shorthand.

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
        episodeOne: 1,
        twoJediWalkIntoACantina: 2,
        lukeSkywalker,
        episodeThree: 3,
        mayTheFourth: 4,
        anakinSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
        anakinSkywalker,
        episodeOne: 1,
        twoJediWalkIntoACantina: 2,
        episodeThree: 3,
        mayTheFourth: 4,
    };
    ```

  <a name="objects--quoted-props"></a>
  - [8.6](#objects--quoted-props) Only quote properties that are invalid identifiers. eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

    > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

    ```javascript
    // bad
    const bad = {
        'foo': 3,
        'bar': 4,
        'data-blah': 5,
    };

    // good
    const good = {
        foo: 3,
        bar: 4,
        'data-blah': 5,
    };
    ```

  <a name="objects--prototype-builtins"></a>
  - [8.7](#objects--prototype-builtins) Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.

    > Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

    ```javascript
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // best
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    /* or */
    import has from 'has';
    // ...
    console.log(has.call(object, key));
    ```

  <a name="objects--rest-spread"></a>
  - [8.8](#objects--rest-spread) Prefer the object spread operator over [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

    ```javascript
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this

    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

    // good
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
    ```

**[⬆ back to top](#table-of-contents)**

## Arrays

  <a name="arrays--literals"></a>
  - [9.1](#arrays--literals) Use the literal syntax for array creation. eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

    ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

  <a name="arrays--push"></a>
  - [9.2](#arrays--push) Use [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  <a name="es6-array-spreads"></a>
  - [9.3](#es6-array-spreads) Use array spreads `...` to copy arrays.

    ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
        itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

  <a name="arrays--from"></a>
  - [9.4](#arrays--from) To convert an array-like object to an array, use [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

    ```javascript
    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);
    ```

  <a name="arrays--callback-return"></a>
  - [9.5](#arrays--callback-return) Use return statements in array method callbacks. It's ok to omit the return if the function body consists of a single statement following [8.2](#8.2). eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

    ```javascript
    // good
    [1, 2, 3].map((x) => {
        const y = x + 1;
        return x * y;
    });

    // good
    [1, 2, 3].map(x => x + 1);

    // bad
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
        const flatten = memo.concat(item);
        flat[index] = flatten;
    });

    // good
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
        const flatten = memo.concat(item);
        flat[index] = flatten;
        return flatten;
    });

    // bad
    inbox.filter((msg) => {
        const { subject, author } = msg;
        if (subject === 'Mockingbird') {
            return author === 'Harper Lee';
        } else {
            return false;
        }
    });

    // good
    inbox.filter((msg) => {
        const { subject, author } = msg;
        if (subject === 'Mockingbird') {
            return author === 'Harper Lee';
        }

        return false;
    });
    ```

  <a name="arrays--bracket-newline"></a>
  - [9.6](#arrays--bracket-newline) Use line breaks after open and before close array brackets if an array has multiple lines

  ```javascript
  // bad
  const arr = [
      [0, 1], [2, 3], [4, 5],
  ];

  const objectInArray = [{
      id: 1,
  }, {
      id: 2,
  }];

  const numberInArray = [
      1, 2,
  ];

  // good
  const arr = [[0, 1], [2, 3], [4, 5]];

  const objectInArray = [
      {
          id: 1,
      },
      {
          id: 2,
      },
  ];

  const numberInArray = [
      1,
      2,
  ];
  ```

**[⬆ back to top](#table-of-contents)**


## Destructuring

  <a name="destructuring--object"></a>
  - [10.1](#destructuring--object) Use object destructuring when accessing and using multiple properties of an object. 

    > Why? Destructuring saves you from creating temporary references for those properties.

    ```javascript
    // bad
    function getFullName(user) {
        const firstName = user.firstName;
        const lastName = user.lastName;

        return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
        const { firstName, lastName } = user;
        return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
        return `${firstName} ${lastName}`;
    }
    ```

  <a name="destructuring--array"></a>
  - [10.2](#destructuring--array) Use array destructuring. 

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

  <a name="destructuring--object-over-array"></a>
  - [10.3](#destructuring--object-over-array) Use object destructuring for multiple return values, not array destructuring. 

    > Why? You can add new properties over time or change the order of things without breaking call sites.

    ```javascript
    // bad
    function processInput(input) {
        // then a miracle occurs
        return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
        // then a miracle occurs
        return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```


**[⬆ back to top](#table-of-contents)**


## Strings

  <a name="strings--quotes"></a>
  - [11.1](#strings--quotes) Use single quotes `''` for strings. eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html) 

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;

    // good
    const name = 'Capt. Janeway';
    ```

  <a name="strings--line-length"></a>
  - [11.2](#strings--line-length) Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation.

    > Why? Broken strings are painful to work with and make code less searchable.

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
        'of Batman. When you stop to think about how Batman had anything to do ' +
        'with this, you would get nowhere fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

  <a name="es6-template-literals"></a>
  - [11.3](#es6-template-literals) When programmatically building up strings, use template strings instead of concatenation. eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing) 
  
    > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

    ```javascript
    // bad
    function sayHi(name) {
        return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
        return ['How are you, ', name, '?'].join();
    }

    // bad
    function sayHi(name) {
        return `How are you, ${ name }?`;
    }

    // good
    function sayHi(name) {
        return `How are you, ${name}?`;
    }
    ```

  <a name="strings--eval"></a>
  - [11.4](#strings--eval) Never use `eval()` on a string, it opens too many vulnerabilities.

  <a name="strings--escaping"></a>
  - [11.5](#strings--escaping) Do not unnecessarily escape characters in strings. eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

    > Why? Backslashes harm readability, thus they should only be present when necessary.

    ```javascript
    // bad
    const foo = '\'this\' \i\s \"quoted\"';

    // good
    const foo = '\'this\' is "quoted"';
    const foo = `my name is '${name}'`;
    ```

**[⬆ back to top](#table-of-contents)**


## Functions

  <a name="functions--declarations"></a>
  - [12.1](#functions--declarations) Use named function expressions instead of function declarations. eslint: [`func-style`](http://eslint.org/docs/rules/func-style) 
  
    > Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to name the expression - anonymous functions can make it harder to locate the problem in an Error's call stack. ([Discussion](https://github.com/airbnb/javascript/issues/794))

    ```javascript
    // bad
    function foo() {
        // ...
    }

    // bad
    const foo = function () {
        // ...
    };

    // good
    const foo = function bar() {
        // ...
    };
    ```

  <a name="functions--iife"></a>
  - [12.2](#functions--iife) Wrap immediately invoked function expressions in parentheses. eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html) 
  
    > Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
        console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

  <a name="functions--in-blocks"></a>
  - [12.3](#functions--in-blocks) Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears. eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

  <a name="functions--note-on-blocks"></a>
  - [12.4](#functions--note-on-blocks) **Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
        function test() {
            console.log('Nope.');
        }
    }

    // good
    let test;
    if (currentUser) {
        test = () => {
            console.log('Yup.');
        };
    }
    ```

  <a name="functions--arguments-shadow"></a>
  - [12.5](#functions--arguments-shadow) Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

    ```javascript
    // bad
    function foo(name, options, arguments) {
        // ...
    }

    // good
    function foo(name, options, args) {
        // ...
    }
    ```

  <a name="es6-rest"></a>
  - [12.6](#es6-rest) Never use `arguments`, opt to use rest syntax `...` instead. eslint: [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)

    > Why? `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

    ```javascript
    // bad
    function concatenateAll() {
        const args = Array.prototype.slice.call(arguments);
        return args.join('');
    }

    // good
    function concatenateAll(...args) {
        return args.join('');
    }
    ```

  <a name="es6-default-parameters"></a>
  - [12.7](#es6-default-parameters) Use default parameter syntax rather than mutating function arguments.

    ```javascript
    // really bad
    function handleThings(opts) {
        // No! We shouldn't mutate function arguments.
        // Double bad: if opts is falsy it'll be set to an object which may
        // be what you want but it can introduce subtle bugs.
        opts = opts || {};
        // ...
    }

    // still bad
    function handleThings(opts) {
        if (opts === void 0) {
            opts = {};
        }
        // ...
    }

    // good
    function handleThings(opts = {}) {
        // ...
    }
    ```

  <a name="functions--default-side-effects"></a>
  - [12.8](#functions--default-side-effects) Avoid side effects with default parameters.

    > Why? They are confusing to reason about.

    ```javascript
    var b = 1;
    // bad
    function count(a = b++) {
        console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```

  <a name="functions--defaults-last"></a>
  - [12.9](#functions--defaults-last) Always put default parameters last.

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
        // ...
    }

    // good
    function handleThings(name, opts = {}) {
        // ...
    }
    ```

  <a name="functions--constructor"></a>
  - [12.10](#functions--constructor) Never use the Function constructor to create a new function. eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)

    > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

    ```javascript
    // bad
    var add = new Function('a', 'b', 'return a + b');

    // still bad
    var subtract = Function('a', 'b', 'return a - b');
    ```

  <a name="functions--signature-spacing"></a>
  - [12.11](#functions--signature-spacing) Spacing in a function signature. eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)

    > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

    ```javascript
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};

    // good
    const x = function() {};
    const y = function a() {};
    ```


  <a name="functions--reassign-params"></a>
  - [12.12](#functions--reassign-params) Never reassign parameters. eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

    > Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the `arguments` object. It can also cause optimization issues, especially in V8.

    ```javascript
    // bad
    function f1(a) {
        a = 1;
        // ...
    }

    function f2(a) {
        if (!a) { a = 1; }
        // ...
    }

    // good
    function f3(a) {
        const b = a || 1;
        // ...
    }

    function f4(a = 1) {
        // ...
    }
    ```

  <a name="functions--spread-vs-apply"></a>
  - [12.13](#functions--spread-vs-apply) Prefer the use of the spread operator `...` to call variadic functions. eslint: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread)

    > Why? It's cleaner, you don't need to supply a context, and you can not easily compose `new` with `apply`.

    ```javascript
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

    // good
    new Date(...[2016, 8, 5]);
    ```

  <a name="functions--signature-invocation-indentation"></a>
  - [12.14](#functions--signature-invocation-indentation) Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item.

    ```javascript
    // bad
    function foo(bar,
                 baz,
                 quux) {
      // ...
    }

    // good
    function foo(
        bar,
        baz,
        quux,
    ) {
      // ...
    }

    // bad
    console.log(foo,
        bar,
        baz);

    // good
    console.log(
        foo,
        bar,
        baz,
    );
    ```

**[⬆ back to top](#table-of-contents)**

## Arrow Functions

  <a name="arrows--use-them"></a>
  - [13.1](#arrows--use-them) When you must use function expressions (as when passing an anonymous function), use arrow function notation. eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html)
  
    > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

    > Why not? If you have a fairly complicated function, you might move that logic out into its own function declaration.

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
        const y = x + 1;
        return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
        const y = x + 1;
        return x * y;
    });
    ```

  <a name="arrows--implicit-return"></a>
  - [13.2](#arrows--implicit-return) If the function body consists of a single expression, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html)

    > Why? Syntactic sugar. It reads well when multiple functions are chained together.

    ```javascript
    // bad
    [1, 2, 3].map(number => {
        const nextNumber = number + 1;
        `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number) => `A string containing the ${number}.`);

    // good
    [1, 2, 3].map((number) => {
        const nextNumber = number + 1;
        return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
        [index]: number,
    }));
    ```

  <a name="arrows--one-arg-parens"></a>
  - [13.3](#arrows--one-arg-parens) Always include parentheses around arguments for clarity and consistency. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html)

    > Why? Less visual clutter.

    ```javascript
    // bad
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map((x) => x * x);
    ```

  <a name="arrows--confusing"></a>
  - [13.4](#arrows--confusing) Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`). eslint: [`no-confusing-arrow`](http://eslint.org/docs/rules/no-confusing-arrow)

    ```javascript
    // bad
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

    // bad
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = (item) => {
        const { height, largeSize, smallSize } = item;
        return height > 256 ? largeSize : smallSize;
    };
    ```

**[⬆ back to top](#table-of-contents)**


## Classes & Constructors

  <a name="constructors--use-class"></a>
  - [14.1](#constructors--use-class) Always use `class`. Avoid manipulating `prototype` directly.

    > Why? `class` syntax is more concise and easier to reason about.

    ```javascript
    // bad
    function Queue(contents = []) {
        this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
    };


    // good
    class Queue {
        constructor(contents = []) {
            this.queue = [...contents];
        }
        pop() {
            const value = this.queue[0];
            this.queue.splice(0, 1);
            return value;
        }
    }
    ```

  <a name="constructors--extends"></a>
  - [14.2](#constructors--extends) Use `extends` for inheritance.

    > Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

    ```javascript
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
        Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
        return this.queue[0];
    };

    // good
    class PeekableQueue extends Queue {
        peek() {
            return this.queue[0];
        }
    }
    ```

  <a name="constructors--chaining"></a>
  - [14.3](#constructors--chaining) Methods can return `this` to help with method chaining.

    ```javascript
    // bad
    Jedi.prototype.jump = function () {
        this.jumping = true;
        return true;
    };

    Jedi.prototype.setHeight = function (height) {
        this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
        jump() {
            this.jumping = true;
            return this;
        }

        setHeight(height) {
            this.height = height;
            return this;
        }
    }

    const luke = new Jedi();

    luke.jump()
        .setHeight(20);
    ```


  <a name="constructors--tostring"></a>
  - [14.4](#constructors--tostring) It's okay to write a custom toString() method, just make sure it works successfully and causes no side effects.

    ```javascript
    class Jedi {
      constructor(options = {}) {
          this.name = options.name || 'no name';
      }

      getName() {
          return this.name;
      }

      toString() {
          return `Jedi - ${this.getName()}`;
      }
    }
    ```

  <a name="constructors--no-useless"></a>
  - [14.5](#constructors--no-useless) Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary. eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

    ```javascript
    // bad
    class Jedi {
        constructor() {}

        getName() {
            return this.name;
        }
    }

    // bad
    class Rey extends Jedi {
        constructor(...args) {
            super(...args);
        }
    }

    // good
    class Rey extends Jedi {
        constructor(...args) {
            super(...args);
            this.name = 'Rey';
        }
    }
    ```

  <a name="classes--no-duplicate-members"></a>
  - [14.6](#classes--no-duplicate-members) Avoid duplicate class members. eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)

    > Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.

    ```javascript
    // bad
    class Foo {
        bar() { return 1; }
        bar() { return 2; }
    }

    // good
    class Foo {
        bar() { return 1; }
    }

    // good
    class Foo {
        bar() { return 2; }
    }
    ```


**[⬆ back to top](#table-of-contents)**


## Iterators and Generators

  <a name="iterators--nope"></a>
  - [15.1](#iterators--nope) Don't use iterators. Prefer JavaScript's higher-order functions instead of loops like `for-in` or `for-of`. eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](http://eslint.org/docs/rules/no-restricted-syntax)

    > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.

    > Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }
    sum === 15;

    // good
    let sum = 0;
    numbers.forEach(num => sum += num);
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

    // bad
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
        increasedByOne.push(numbers[i] + 1);
    }

    // good
    const increasedByOne = [];
    numbers.forEach(num => increasedByOne.push(num + 1));

    // best (keeping it functional)
    const increasedByOne = numbers.map(num => num + 1);
    ```

  <a name="generators--nope"></a>
  - [15.2](#generators--nope) Don't use generators for now.

    > Why? They don't transpile well to ES5.

**[⬆ back to top](#table-of-contents)**


## Properties

  <a name="properties--dot"></a>
  - [16.1](#properties--dot) Use dot notation when accessing properties. eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html)

    ```javascript
    const luke = {
        jedi: true,
        age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

  <a name="properties--bracket"></a>
  - [16.2](#properties--bracket) Use bracket notation `[]` when accessing properties with a variable.

    ```javascript
    const luke = {
        jedi: true,
        age: 28,
    };

    function getProp(prop) {
        return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

**[⬆ back to top](#table-of-contents)**


## Variables

  <a name="variables--const"></a>
  - [17.1](#variables--const) Always use `const` or `let` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that. eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef) [`prefer-const`](http://eslint.org/docs/rules/prefer-const)

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

  <a name="variables--one-const"></a>
  - [17.2](#variables--one-const) Use one `const` or `let` declaration per variable. eslint: [`one-var`](http://eslint.org/docs/rules/one-var.html)

    > Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

    ```javascript
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```

  <a name="variables--const-let-group"></a>
  - [17.3](#variables--const-let-group) Group all your `const`s and then group all your `let`s.

    > Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

  <a name="variables--define-where-used"></a>
  - [17.4](#variables--define-where-used) Assign variables where you need them, but place them in a reasonable place.

    > Why? `let` and `const` are block scoped and not function scoped.

    ```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
        const name = getName();

        if (hasName === 'test') {
            return false;
        }

        if (name === 'test') {
            this.setName('');
            return false;
        }

        return name;
    }

    // good
    function checkName(hasName) {
        if (hasName === 'test') {
            return false;
        }

        const name = getName();

        if (name === 'test') {
            this.setName('');
            return false;
        }

        return name;
    }
    ```
  <a name="variables--no-chain-assignment"></a>
  - [17.5](#variables--no-chain-assignment) Don't chain variable assignments.

    > Why? Chaining variable assignments creates implicit global variables.

    ```javascript
    // bad
    (function example() {
        // JavaScript interprets this as
        // let a = ( b = ( c = 1 ) );
        // The let keyword only applies to variable a; variables b and c become
        // global variables.
        let a = b = c = 1;
    }());

    console.log(a); // undefined
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
        let a = 1;
        let b = a;
        let c = a;
    }());

    console.log(a); // undefined
    console.log(b); // undefined
    console.log(c); // undefined

    // the same applies for `const`
    ```

  <a name="variables--unary-increment-decrement"></a>
  - [17.6](#variables--unary-increment-decrement) Avoid using unary increments and decrements (++, --). Only exception of this rule are for loop expressions. eslint [`no-plusplus`](http://eslint.org/docs/rules/no-plusplus)

    > Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

    ```javascript
    // bad

    const array = [1, 2, 3];
    let num = 1;
    num++;
    --num;

    let sum = 0;
    let truthyCount = 0;
    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        sum += value;
        if (value) {
            truthyCount++;
        }
    }

    // good

    const array = [1, 2, 3];
    let num = 1;
    num += 1;
    num -= 1;

    const sum = array.reduce((a, b) => a + b, 0);
    const truthyCount = array.filter(Boolean).length;
    ```

**[⬆ back to top](#table-of-contents)**


## Hoisting

  <a name="hoisting--about"></a>
  - [18.1](#hoisting--about) `var` declarations get hoisted to the top of their scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let). It's important to know why [typeof is no longer safe](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

    ```javascript
    // we know this wouldn't work (assuming there
    // is no notDefined global variable)
    function example() {
        console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
        console.log(declaredButNotAssigned); // => undefined
        var declaredButNotAssigned = true;
    }

    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
        let declaredButNotAssigned;
        console.log(declaredButNotAssigned); // => undefined
        declaredButNotAssigned = true;
    }

    // using const and let
    function example() {
        console.log(declaredButNotAssigned); // => throws a ReferenceError
        console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
        const declaredButNotAssigned = true;
    }
    ```

  <a name="hoisting--anon-expressions"></a>
  - [18.2](#hoisting--anon-expressions) Anonymous function expressions hoist their variable name, but not the function assignment.

    ```javascript
    function example() {
        console.log(anonymous); // => undefined

        anonymous(); // => TypeError anonymous is not a function

        var anonymous = function () {
            console.log('anonymous function expression');
        };
    }
    ```

  <a name="hoisting--named-expresions"></a>
  - [18.3](#hoisting--named-expresions) Named function expressions hoist the variable name, not the function name or the function body.

    ```javascript
    function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        superPower(); // => ReferenceError superPower is not defined

        var named = function superPower() {
            console.log('Flying');
        };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        var named = function named() {
            console.log('named');
        };
    }
    ```

  <a name="hoisting--declarations"></a>
  - [18.4](#hoisting--declarations) Function declarations hoist their name and the function body.

    ```javascript
    function example() {
        superPower(); // => Flying

        function superPower() {
            console.log('Flying');
        }
    }
    ```

  - For more information refer to [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](http://www.adequatelygood.com/).

**[⬆ back to top](#table-of-contents)**


## Comparison Operators & Equality

  <a name="comparison--eqeqeq"></a>
  - [19.1](#comparison--eqeqeq) Use `===` and `!==` over `==` and `!=`. eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

  <a name="comparison--if"></a>
  - [19.2](#comparison--if) Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    + **Objects** evaluate to **true**
    + **Undefined** evaluates to **false**
    + **Null** evaluates to **false**
    + **Booleans** evaluate to **the value of the boolean**
    + **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    + **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    ```javascript
    if ([0] && []) {
        // true
        // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

  <a name="comparison--shortcuts"></a>
  - [19.3](#comparison--shortcuts) Use shortcuts for booleans, but explicit comparisons for strings and numbers.

    ```javascript
    // bad
    if (isValid === true) {
        // ...
    }

    // good
    if (isValid) {
        // ...
    }

    // bad
    if (name) {
        // ...
    }

    // good
    if (name !== '') {
        // ...
    }

    // bad
    if (collection.length) {
        // ...
    }

    // good
    if (collection.length > 0) {
        // ...
    }
    ```

  <a name="comparison--moreinfo"></a>
  - [19.4](#comparison--moreinfo) For more information see [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.

  <a name="comparison--switch-blocks"></a>
  - [19.5](#comparison--switch-blocks) Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`).

    > Why? Lexical declarations are visible in the entire `switch` block but only get initialized when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

    eslint rules: [`no-case-declarations`](http://eslint.org/docs/rules/no-case-declarations.html).

    ```javascript
    // bad
    switch (foo) {
        case 1:
            let x = 1;
            break;
        case 2:
            const y = 2;
            break;
        case 3:
            function f() {
                // ...
            }
            break;
        default:
            class C {}
    }

    // good
    switch (foo) {
        case 1: {
            let x = 1;
            break;
        }
        case 2: {
            const y = 2;
            break;
        }
        case 3: {
            function f() {
                // ...
            }
            break;
        }
        case 4:
            bar();
            break;
        default: {
            class C {}
      }
    }
    ```

  <a name="comparison--nested-ternaries"></a>
  - [19.6](#comparison--nested-ternaries) Ternaries should not be nested and generally be single line expressions.

    eslint rules: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html).

    ```javascript
    // bad
    const foo = maybe1 > maybe2
        ? "bar"
        : value1 > value2 ? "baz" : null;

    // good
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2
        ? 'bar'
        : maybeNull;

    // best
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

  <a name="comparison--unneeded-ternary"></a>
  - [19.7](#comparison--unneeded-ternary) Avoid unneeded ternary statements.

    eslint rules: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary.html).

    ```javascript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    ```

**[⬆ back to top](#table-of-contents)**


## Blocks

  <a name="blocks--braces"></a>
  - [20.1](#blocks--braces) Use braces with all block statements.

    ```javascript
    // bad
    if (test)
        return false;

    // bad
    if (test) return false;

    // bad
    function foo() { return false; }

    // good
    if (test) {
        return false;
    }

    // good
    function bar() {
        return false;
    }
    ```

  <a name="blocks--cuddled-elses"></a>
  - [20.2](#blocks--cuddled-elses) If you're using multi-line blocks with `if` and `else`, put `else` on the same line as your `if` block's closing brace. eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

    ```javascript
    // bad
    if (test) {
        thing1();
        thing2();
    }
    else {
        thing3();
    }

    // good
    if (test) {
        thing1();
        thing2();
    } else {
        thing3();
    }
    ```


**[⬆ back to top](#table-of-contents)**


## Comments

  <a name="comments--multiline"></a>
  - [21.1](#comments--multiline) Use `/* ... */` for multi-line comments.

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {
        // ...
        return element;
    }

    // good
    /*
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
        // ...
        return element;
    }
    ```

  <a name="comments--singleline"></a>
  - [21.2](#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it's on the first line of a block.

    ```javascript
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
        console.log('fetching type...');
        // set the default type to 'no type'
        const type = this.type || 'no type';

        return type;
    }

    // good
    function getType() {
        console.log('fetching type...');

        // set the default type to 'no type'
        const type = this.type || 'no type';

        return type;
    }

    // also good
    function getType() {
        // set the default type to 'no type'
        const type = this.type || 'no type';

        return type;
    }
    ```

  - [21.3](#comments--spaces) Start all comments with a space to make it easier to read. eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

    ```javascript
    // bad
    //is current tab
    const active = true;

    // good
    // is current tab
    const active = true;

    // bad
    /*
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {
        // ...
        return element;
    }

    // good
    /*
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
        // ...
        return element;
    }
    ```

  <a name="comments--actionitems"></a>
  - [21.4](#comments--actionitems) Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.

  <a name="comments--fixme"></a>
  - [21.5](#comments--fixme) Use `// FIXME:` to annotate problems.

    ```javascript
    class Calculator extends Abacus {
        constructor() {
            super();

            // FIXME: shouldn't use a global here
            total = 0;
        }
    }
    ```

  <a name="comments--todo"></a>
  - [21.6](#comments--todo) Use `// TODO:` to annotate solutions to problems.

    ```javascript
    class Calculator extends Abacus {
        constructor() {
            super();

            // TODO: total should be configurable by an options param
            this.total = 0;
        }
    }
    ```

**[⬆ back to top](#table-of-contents)**


## Type Casting & Coercion

  <a name="coercion--explicit"></a>
  - [22.1](#coercion--explicit) Perform type coercion at the beginning of the statement.

  <a name="coercion--strings"></a>
  - [22.2](#coercion--strings)  Strings:

    ```javascript
    // => this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    const totalScore = this.reviewScore.toString(); // isn't guaranteed to return a string

    // good
    const totalScore = String(this.reviewScore);
    ```

  <a name="coercion--numbers"></a>
  - [22.3](#coercion--numbers) Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings. No bit shifting! eslint: [`radix`](http://eslint.org/docs/rules/radix)

    ```javascript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```

  <a name="coercion--booleans"></a>
  - [22.4](#coercion--booleans) Booleans:

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```

**[⬆ back to top](#table-of-contents)**


## Accessors

  <a name="accessors--not-required"></a>
  - [23.1](#accessors--not-required) Accessor functions for properties are not required.

  <a name="accessors--no-getters-setters"></a>
  - [23.2](#accessors--no-getters-setters) Do not use JavaScript getters/setters as they cause unexpected side effects and are harder to test, maintain, and reason about. Instead, if you do make accessor functions, use getVal() and setVal('hello').

    ```javascript
    // bad
    class Dragon {
        get age() {
            // ...
        }

        set age(value) {
            // ...
        }
    }

    // good
    class Dragon {
        getAge() {
            // ...
        }

        setAge(value) {
            // ...
        }
    }
    ```

  <a name="accessors--boolean-prefix"></a>
  - [23.3](#accessors--boolean-prefix) If the property/method is a `boolean`, use `isVal()` or `hasVal()`.

    ```javascript
    // bad
    if (!dragon.age()) {
        return false;
    }

    // good
    if (!dragon.hasAge()) {
        return false;
    }
    ```

  <a name="accessors--consistent"></a>
  - [23.4](#accessors--consistent) It's okay to create get() and set() functions, but be consistent.

    ```javascript
    class Jedi {
        constructor(options = {}) {
            const lightsaber = options.lightsaber || 'blue';
            this.set('lightsaber', lightsaber);
        }

        set(key, val) {
            this[key] = val;
        }

        get(key) {
            return this[key];
        }
    }
    ```

**[⬆ back to top](#table-of-contents)**


## Events

  <a name="events--hash"></a>
  - [24.1](#events--hash) When attaching data payloads to events (whether DOM events or something more proprietary like Backbone events), pass a hash instead of a raw value. This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead of:

    ```javascript
    // bad
    $(this).trigger('listingUpdated', listing.id);

    $(this).on('listingUpdated', (e, listingId) => {
        // do something with listingId
    });
    ```

    prefer:

    ```javascript
    // good
    $(this).trigger('listingUpdated', { listingId: listing.id });

    $(this).on('listingUpdated', (e, data) => {
        // do something with data.listingId
    });
    ```

  **[⬆ back to top](#table-of-contents)**


## jQuery

  <a name="jquery--dollar-prefix"></a>
  - [25.1](#jquery--dollar-prefix) Prefix jQuery object variables with a `$`. 

    ```javascript
    // bad
    const sidebar = $('.sidebar');

    // good
    const $sidebar = $('.sidebar');

    // good
    const $sidebarBtn = $('.sidebar-btn');
    ```

  <a name="jquery--cache"></a>
  - [25.2](#jquery--cache) Cache jQuery lookups.

    ```javascript
    // bad
    function setSidebar() {
        $('.sidebar').hide();

        $('.sidebar').css({
            'background-color': 'pink',
        });
    }

    // good
    function setSidebar() {
        const $sidebar = $('.sidebar');
        $sidebar.hide();

        $sidebar.css({
            'background-color': 'pink',
        });
    }
    ```

  <a name="jquery--queries"></a>
  - [25.3](#jquery--queries) For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

  <a name="jquery--find"></a>
  - [25.4](#jquery--find) Use `find` with scoped jQuery object queries.

    ```javascript
    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();
    ```



## Resources

**Style Guides**
  - [airbnb style guide](https://github.com/airbnb/javascript)
  - [symfony style guide](http://symfony.com/doc/current/contributing/code/standards.html)


**Learning ES6**

  - [Draft ECMA 2015 (ES6) Spec](https://people.mozilla.org/~jorendorff/es6-draft.html)
  - [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)
  - [Comprehensive Overview of ES6 Features](http://es6-features.org/)
  - [Babel ES6 Playground](https://babeljs.io/repl/)


## License

nikita.js is licensed under [CC0](http://creativecommons.org/publicdomain/zero/1.0/): Public Domain Dedication.
