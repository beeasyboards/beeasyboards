import Vue from 'vue';
import DisqusComponent from 'pages/blog/components/disqus';
import IndexPage from 'pages/blog/index';
import BlogPostsComponent from 'pages/blog/components/posts';

//
// Blog
//
describe('Blog', () => {

    //
    // Posts page
    //
    it('Should display a message when no search results exist', (done) => {
        Vue.prototype.$route = { query: { search: null } };
        let vm = new Vue(IndexPage).$mount();
        expect(vm.$el.querySelectorAll('.results > ul').length).toBe(0);
        expect(vm.$el.querySelectorAll('.results > p').length).toBe(1);

        vm.posts = [{ title: 'foo' }];
        vm.$nextTick(() => {
            expect(vm.$el.querySelectorAll('.results > ul').length).toBe(1);
            expect(vm.$el.querySelectorAll('.results > p').length).toBe(0);
            done();
        });
    });

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
        expect(vm.$el.querySelectorAll('p').length).toBe(0);
        expect(vm.$el.querySelectorAll('li').length).toBe(3);
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
