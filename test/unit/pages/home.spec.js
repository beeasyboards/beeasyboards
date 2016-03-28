import Vue from 'vue';
import SliderComponent from 'pages/home/components/slider';

/**
 * Factory to create test the SliderComponent
 *
 * @param  {Array|null} slides
 * @return {Object}
 */
let TestSlider = function(slides = []) {
    let vm = new Vue({
        components: { test: SliderComponent },
        template: '<div><test :slides="slides"></test></div>',
        data: { slides },
    }).$mount();

    let slider = vm.$children[0];
    return { vm, slider }
};

describe('Home', () => {

    //
    // Slider component
    //
    describe('Slider', () => {
        it('Calculates the previous and next slide index', () => {
            let { slider } = TestSlider([
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
            ]);

            slider.currentIndex = 1;
            expect(slider.previousIndex).toBe(0);
            expect(slider.nextIndex).toBe(2);
        });

        it('Treats the last slide as "previous" when on the first index', () => {
            let { slider } = TestSlider([
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
            ]);

            slider.currentIndex = 0;
            expect (slider.previousIndex).toBe(2);
        });

        it('Treats the first slide as "next" when on the last index', () => {
            let { slider } = TestSlider([
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
            ]);

            slider.currentIndex = 2;
            expect (slider.nextIndex).toBe(0);
        });

        it('Advances to the next slide when swiped left', () => {
            let { slider } = TestSlider([
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
            ]);

            slider.currentIndex = 1;
            slider.onSwipeLeft();
            expect(slider.currentIndex).toBe(2);
        });

        it('Returns to the previous slide when swiped right', () => {
            let { slider } = TestSlider([
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
                { image: { path: './../test.png' } },
            ]);

            slider.currentIndex = 1;
            slider.onSwipeRight();
            expect(slider.currentIndex).toBe(0);
        });
    });
});
