import ParseBlogPosts from 'pages/blog/utilities/parse_posts.js';

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
});
