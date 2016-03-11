import Vue from 'vue';
import DisqusComponent from 'pages/blog/components/disqus';
import BlogPostsComponent from 'pages/blog/components/posts';

//
// Blog
//
describe('Blog', () => {

    //
    // Posts component
    //
    it('Should render a list of posts', () => {
        let vm = new Vue({
            components: { test: BlogPostsComponent },
            template: '<div><test :posts="posts"></test></div>',
            data: {
                posts: [
                    { title: 'foo' },
                    { title: 'bar' },
                    { title: 'baz' },
                ],
            },
        }).$mount();

        expect(vm.$el.querySelectorAll('ul').length).toBe(1);
        expect(vm.$el.querySelectorAll('li').length).toBe(3);
    });

    it('Should only render a <ul> container when there are posts', () => {
        let vm = new Vue({
            components: { test: BlogPostsComponent },
            template: '<div><test :posts="posts"></test></div>',
            data: { posts: [] },
        }).$mount();

        expect(vm.$el.querySelectorAll('ul').length).toBe(0);
    });

    //
    // Disqus comments
    //
    it('Should only append the Disqus <script> tag once', () => {
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
