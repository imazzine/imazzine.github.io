---
layout: default
lang: en
categories: [en, paper]
ref: paper-1
title: Paper 1
excerpt: Paper 1
---

Some text here.


```javascript
/**
   * Class constructor for Button MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @param {HTMLElement} element The element that will be upgraded.
   */
var MaterialButton = function MaterialButton(element) {
    this.element_ = element;
    // Initialize instance.
    this.init();
};
```