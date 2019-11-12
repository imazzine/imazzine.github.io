---
layout: default
lang: ru
categories: [ru, paper]
ref: paper-2
title: Статья 2
excerpt: Статья 2
---

Какой-то текст.


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