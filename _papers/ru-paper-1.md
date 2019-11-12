---
layout: default
lang: ru
categories: [ru, paper]
ref: paper-1
title: Статья 1
excerpt: Статья 1
---

## MENUS

Lists of clickable actions.

```html
<!-- Left aligned menu below button -->
<button id="demo-menu-lower-left"
        class="mdl-button mdl-js-button mdl-button--icon">
  <i class="material-icons">more_vert</i>
</button>

<ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
    for="demo-menu-lower-left">
  <li class="mdl-menu__item">Some Action</li>
  <li class="mdl-menu__item mdl-menu__item--full-bleed-divider">Another Action</li>
  <li disabled class="mdl-menu__item">Disabled Action</li>
  <li class="mdl-menu__item">Yet Another Action</li>
</ul>
<!-- Right aligned menu below button -->
<button id="demo-menu-lower-right"
        class="mdl-button mdl-js-button mdl-button--icon">
  <i class="material-icons">more_vert</i>
</button>

<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
    for="demo-menu-lower-right">
  <li class="mdl-menu__item">Some Action</li>
  <li class="mdl-menu__item">Another Action</li>
  <li disabled class="mdl-menu__item">Disabled Action</li>
  <li class="mdl-menu__item">Yet Another Action</li>
</ul>
```

## INTRODUCTION

The Material Design Lite (MDL) *menu* component is a user interface element that allows users to select one of a number of options. The selection typically results in an action initiation, a setting change, or other observable effect. Menu options are always presented in sets of two or more, and options may be programmatically enabled or disabled as required. The menu appears when the user is asked to choose among a series of options, and is usually dismissed after the choice is made.

Menus are an established but non-standardized feature in user interfaces, and allow users to make choices that direct the activity, progress, or characteristics of software. Their design and use is an important factor in the overall user experience. See the menu component's Material Design specifications page for details.

## TO INCLUDE AN MDL MENU COMPONENT:

> *Note:* The menu requires a non-static positioned parent element. Positioning options may not work properly if the menu is inside of a statically positioned node.

 1. Code a `<button>` element; this is the clickable toggle that will show and hide the menu options. Include an `id` attribute whose value will match the `for` (or `data-mdl-for`) attribute of the unordered list coded in the next step. Inside the button, code a `<i>` or `<span>` element to contain an icon of your choice.

 ```html
<button id="menu1">
  <i></i>
</button>
 ```

 2. Code a `<ul>` unordered list element; this is the container that holds the options. Include a `for` attribute whose value matches the `id` attribute of the button element.

 ```html
<ul for="menu1">
</ul>
 ```

 ## EXAMPLES

1. Javascript:

 ```javascript
goog.require('goog.net.XhrIo');

/**
 * Retrieve JSON data using XhrIo's static send() method.
 *
 * @param {string} dataUrl The url to request.
 */
function getData(dataUrl) {
  log('Sending simple request for ['+ dataUrl + ']');
  goog.net.XhrIo.send(dataUrl, function(e) {
      var xhr = e.target;
      var obj = xhr.getResponseJson();
      log('Received Json data object with title property of "' +  
          obj['title'] + '"'); 
      alert(obj['content']);
  });
}

function log(msg) {
  document.getElementById('log').appendChild(document.createTextNode(msg));
  document.getElementById('log').appendChild(document.createElement('br'));
}
 ```

 2. Typescript

 ```typescript
const myGreeter = new Greeter("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();

class SpecialGreeter extends Greeter {
    constructor() {
        super("Very special greetings");
    }
}
 ```