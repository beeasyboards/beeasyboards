import Vue from 'vue';
import HomieComponent from 'pages/downforlife/components/homie';

//
// Down for life
//
describe('Down for life', () => {

    /**
     * Homie factory
     *
     * @param  {Object} data
     * @return {Object}
     */
    let CreateHomie = function(homie = {}) {
        return new Vue({
            data: { homie },
            components: { test: HomieComponent },
            template: '<div><test :homie="homie"></test></div>',
        }).$mount();
    };

    //
    // Image display
    //
    it('Should only display an <img> tag if the homie has an image', () => {
        let vm1 = CreateHomie();
        expect(vm1.$el.querySelectorAll('img').length).toBe(0);

        let vm2 = CreateHomie({
            image: {
                path: './../test.png',
            },
        });
        expect(vm2.$el.querySelectorAll('img').length).toBe(1);
    });

    //
    // Mobile events
    //
    it('Should bind a .is-mobile class for mobile users', () => {
        Vue.prototype.$isMobile = false;
        let vm1 = CreateHomie();
        expect(vm1.$el.querySelectorAll('.is-mobile').length).toBe(0);

        Vue.prototype.$isMobile = true;
        let vm2 = CreateHomie();
        expect(vm2.$el.querySelectorAll('.is-mobile').length).toBe(1);
    });

    it('Tap and doubletap events should only fire on mobile', () => {
        Vue.prototype.$isMobile = false;
        let vm = CreateHomie().$children[0];
        vm.isTapped = false;
        vm.onTap();
        expect(vm.isTapped).toBe(false);

        Vue.prototype.$isMobile = true;
        vm.onTap();
        expect(vm.isTapped).toBe(true);
        vm.onTap();
        expect(vm.isTapped).toBe(false);
    });

    it('Tapping should toggle .is-tapped class', (done) => {
        Vue.prototype.$isMobile = true;
        let vm = CreateHomie(),
            homie = vm.$children[0];

        expect(homie.isTapped).toBe(false);
        expect(Object.values(homie.$el.classList).indexOf('is-tapped')).toBe(-1);

        homie.onTap();
        homie.$nextTick(() => {
            expect(homie.isTapped).toBe(true);
            expect(Object.values(homie.$el.classList).indexOf('is-tapped')).not.toBe(-1);
            done();
        });
    });

    it('Tapping homies should disable captions of sibling homies', (done) => {
        Vue.prototype.$isMobile = true;
        let vm = new Vue({
            data: { homie: {} },
            components: { test: HomieComponent },
            template: '<div><test :homie="homie"></test><test :homie="homie"></test></div>',
        }).$mount();

        vm.$children[0].isTapped = true;
        vm.$children[1].onTap();
        vm.$nextTick(() => {
            expect(vm.$children[0].isTapped).toBe(false);
            done();
        });
    });
});
