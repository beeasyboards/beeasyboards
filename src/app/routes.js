module.exports = {

    /**
     * Redirects
     *
     * @type {Object}
     */
    redirects: { },

    /**
     * Routes
     *
     * @type {Object}
     */
    routes: {

        //
        // Home
        //
        '/': {
            name: 'home',
            component: require('pages/home'),
        },

        //
        // Blog
        //
        '/blog': {
            name: 'blog-index',
            component: require('pages/blog/index'),
        },

        '/blog/:slug': {
            name: 'blog-show',
            component: require('pages/blog/show'),
        },

        //
        // Shop
        //
        '/shop': {
            name: 'shop',
            component: require('pages/shop/index'),
            subRoutes: {
                '/': {
                    component: require('pages/shop/category'),
                },
                '/:slug': {
                    name: 'shop-category',
                    component: require('pages/shop/category'),
                },
                '/product/:slug': {
                    name: 'shop-product',
                    component: require('pages/shop/product'),
                },
            },
        },
    },
};
