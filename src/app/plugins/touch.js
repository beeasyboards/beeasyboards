import Vue from 'vue';
import VueTouch from 'vue-touch';

Vue.use(VueTouch);

//
// Doubletap
//
VueTouch.registerCustomEvent('doubletap', {
    type: 'tap',
    taps: 2,
});
