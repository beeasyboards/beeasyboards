import Vue from 'vue';
import ParseBlogPosts from 'pages/blog/utilities/parse_posts.js';
import DisqusComponent from 'pages/blog/components/disqus';

//
// Blog
//
describe('Blog posts', () => {

    it('Should use the first image as the thumbnail', () => {
        let Posts = ParseBlogPosts({ data: [
            { id: 1, 'featured_images': [{ 'path': 'first.jpg' }, { 'path': 'second.jpg' }] },
            { id: 2, 'featured_images': [{ 'path': 'third.jpg' }] },
            { id: 3, 'featured_images': [] },
        ]});

        expect(Posts[0].thumbnail.path).toBe('first.jpg');
        expect(Posts[1].thumbnail.path).toBe('third.jpg');
        expect(Posts[2].thumbnail.path).toBe(null);
    });

    it('Should only append the Disqus script tag once', () => {
        let mountDisqusComponent = function() {
            new Vue({
                replace: false,
                template: '<div><v-disqus></v-disqus></div>',
                components: { 'v-disqus': DisqusComponent }
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
