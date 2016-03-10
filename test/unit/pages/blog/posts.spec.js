import Vue from 'vue';
import DisqusComponent from 'pages/blog/components/disqus';
import ThumbnailComponent from 'pages/blog/components/thumbnail';

//
// Blog
//
describe('Blog posts', () => {
    it('Should only append the Disqus script tag once', () => {
        let mountDisqusComponent = function() {
            new Vue({
                replace: false,
                template: '<div><test></test></div>',
                components: { test: DisqusComponent }
            }).$mount('body');
        };

        let disqusCount = function() {
            let scripts = 0;
            for (let script of document.scripts) {
                if (script.src.indexOf('disqus') !== -1) scripts++;
            }
            return scripts;
        };

        // Mounting a component should append a <script> tag
        expect(disqusCount()).toBe(0);
        mountDisqusComponent();
        expect(disqusCount()).toBe(1);

        // Mounting another component shouldn't append more <script> tags
        mountDisqusComponent();
        expect(disqusCount()).toBe(1);
    });
});
