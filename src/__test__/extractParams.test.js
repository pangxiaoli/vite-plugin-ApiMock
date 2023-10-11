import extractParams from "../utils/extractParams";

describe('extractParams', () => {
    it('should extract path parameters correctly', () => {
        const apiPath = '/users/:id/posts/:postId';
        const reqPath = '/users/123/posts/456';
        const queryParams = '';

        const params = extractParams(apiPath, reqPath, queryParams);

        expect(params).toEqual({ id: '123', postId: '456' });
    });

    it('should extract wildcard path parameter correctly', () => {
        const apiPath = '/products/*';
        const reqPath = '/products/electronics/123';
        const queryParams = '';

        const params = extractParams(apiPath, reqPath, queryParams);

        expect(params).toEqual({ '*': 'electronics' });
    });

    it('should extract query parameters correctly', () => {
        const apiPath = '/users';
        const reqPath = '/users';
        const queryParams = 'name=John&age=30';

        const params = extractParams(apiPath, reqPath, queryParams);

        expect(params).toEqual({ name: 'John', age: '30' });
    });

    it('should handle missing path parameters gracefully', () => {
        const apiPath = '/users/:id/posts/:postId';
        const reqPath = '/users/123/posts'; // Missing postId
        const queryParams = '';

        const params = extractParams(apiPath, reqPath, queryParams);

        expect(params).toEqual({ id: '123' });
    });

    it('should handle missing query parameters gracefully', () => {
        const apiPath = '/users';
        const reqPath = '/users';
        const queryParams = ''; // No query parameters

        const params = extractParams(apiPath, reqPath, queryParams);

        expect(params).toEqual({});
    });

    it('should handle multiple query parameters with the same key', () => {
        const apiPath = '/users';
        const reqPath = '/users';
        const queryParams = 'name=John&name=Doe&age=30';

        const params = extractParams(apiPath, reqPath, queryParams);

        expect(params).toEqual({ name: 'Doe', age: '30' }); // Only the last occurrence of 'name' is considered
    });
});
