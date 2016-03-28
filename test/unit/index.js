//
// Vue
//
import Vue from 'vue';
Vue.directive('link', {});
Vue.directive('touch', {});
Vue.directive('touch-options', {});
Vue.filter('moment', {});

// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
