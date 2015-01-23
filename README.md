Overview
========

bpmn.js is a implementation of the BPMN 2.0 Metamodel in JavaScript including execution support.
If you need a JavaScript-based BPMN renderer, check [bpmn-io](https://github.com/bpmn-io).

Getting started
===============

Check the `example.html` for a requirejs based setup of bpmn.js

Development
===========

Run
```
    grunt watch:tests
```
to run the karma tests and have grunt re-run them on changes.

Run
```
    grunt dist
```
to update both combined (AMD + nodejs) and requirejs-only flavors in the `lib` folder

License
=======

You may use bpmn.js under the terms of the MIT License, see the LICENSE file.

&copy; 2014, The Monkey Bros
