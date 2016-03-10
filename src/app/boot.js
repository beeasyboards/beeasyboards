import Vue from 'vue';

//
// Plugins
//
Vue.use(require('./plugins/sourceable'));

//
// Directives
//
require('./directives/linkable');

//
// Filters
//
require('./filters/moment');
