/**
 * Parse BlogResource responses and use the first featured image our thumbnail.
 *
 * @param  {Array}  options.data    The response data
 * @return {Array}
 */
module.exports = function ({ data }) {
    return data.map(post => {
        post.thumbnail = { path: null, alt: null };

        if (post.featured_images.length > 0) {
            let img = post.featured_images[0];
            post.thumbnail.path = img.path;
            post.thumbnail.alt = img.title;
        }

        return post;
    });
};
