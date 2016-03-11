import Vue from 'vue';

//
// Plugins
//
describe('Plugins', () => {
    describe('Resources', () => {

        //
        // The plugin should register a $resources() method on all Vue instances.
        //
        it('Should add $resources method', () => {
            Vue.use(require('app/plugins/resources'));
            expect(typeof (new Vue()).$resources).toBe('function');
        });

        //
        // $resources() should assign the result of a promise to a model
        //
        it('Should assign resource data to models', (done) => {
            let itWorks = false;
            let vm = new Vue({ data: { itWorks }});
            expect(vm.$get('itWorks')).toBe(false);

            itWorks = new Promise(resolve => resolve({ data: true }));
            vm.$resources({ itWorks });

            setTimeout(() => {
                expect(vm.$get('itWorks')).toBe(true);
                done();
            }, 1000);
        });
    });
});
