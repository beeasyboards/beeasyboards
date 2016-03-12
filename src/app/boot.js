import Vue from 'vue';

//
// Plugins
//
require('./plugins/touch.js');
Vue.use(require('./plugins/is_mobile'));
Vue.use(require('./plugins/resources'));

//
// Directives
//
require('./directives/linkable');

//
// Filters
//
require('./filters/moment');
