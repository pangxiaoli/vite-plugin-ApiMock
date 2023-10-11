import pathToRegex from "../utils/pathtoRegex"

describe('pathtoRegex', () => {
    // 测试用例1：基本路径
    it('Simple path without parameters', () => {
        const regex = pathToRegex('/users');
        expect(regex.test('/users')).toBe(true);
        expect(regex.test('/users/123')).toBe(false);
    });

    // 测试用例2：带有参数的路径
    it('Path with parameters', () => {
        const regex = pathToRegex('/users/:id');
        expect(regex.test('/users/123')).toBe(true);
        expect(regex.test('/users/john')).toBe(true);
        expect(regex.test('/users/123/posts')).toBe(false);
    });

    // 测试用例3：通配符路径
    it('Wildcard path', () => {
        const regex = pathToRegex('/products/*');
        expect(regex.test('/products/123')).toBe(true);
        expect(regex.test('/products/electronics/phone')).toBe(true);
    });

    // 测试用例4：多个参数和通配符混合
    it('Path with multiple parameters and wildcard', () => {
        const regex = pathToRegex('/categories/:category/products/:id/*');
        expect(regex.test('/categories/electronics/products/123/details')).toBe(true);
        expect(regex.test('/categories/clothing/products/shirt/images/1')).toBe(true);
        expect(regex.test('/categories/electronics/123/details')).toBe(false);
    });

    // 测试用例5：路径末尾有斜杠
    it('Path with trailing slash', () => {
        const regex = pathToRegex('/about/');
        expect(regex.test('/about/')).toBe(true);
        expect(regex.test('/about')).toBe(false);
    });

    // 测试用例6：路径中包含特殊字符
    it('Path with special characters', () => {
        const regex = pathToRegex('/search/:query+');
        expect(regex.test('/search/keyword')).toBe(true);
        expect(regex.test('/search/keyword/with/slashes')).toBe(false);
        expect(regex.test('/search/')).toBe(false);
    });

    // 测试用例7：空路径
    it('Empty path', () => {
        const regex = pathToRegex('');
        expect(regex.test('')).toBe(true);
        expect(regex.test('/')).toBe(true);
        expect(regex.test('/users')).toBe(false);
    });

    // 测试用例8：带有连续斜杠的路径
    it('Path with consecutive slashes', () => {
        const regex = pathToRegex('/users/:id');
        expect(regex.test('/users//123')).toBe(false);
    });

    // 测试用例9：路径中包含正则表达式元字符
    it('Path with regex metacharacters', () => {
        const regex = pathToRegex('/users/:id+');
        expect(regex.test('/users/12+3')).toBe(true);
        expect(regex.test('/users/1*3')).toBe(true);
    });

    // 测试用例10：路径中包含特殊字符和通配符
    it('Path with special characters and wildcard', () => {
        const regex = pathToRegex('/files/*.*');
        expect(regex.test('/files/document.pdf')).toBe(true);
        expect(regex.test('/files/images/photo.jpg')).toBe(true);
        expect(regex.test('/files/data/json')).toBe(true);
    });
});