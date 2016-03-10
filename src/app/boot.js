import Vue from 'vue';

//
// Plugins
//
Vue.use(require('./plugins/resources'));

//
// Directives
//
require('./directives/linkable');

//
// Filters
//
require('./filters/moment');
