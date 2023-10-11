/**
 * 提取路径参数和查询参数
 * @param apiPath - API路径
 * @param reqPath - 请求路径
 * @param queryParams - 请求的查询参数
 * @returns 提取的参数对象
 */
export default function extractParams(apiPath: string, reqPath: string, queryParams?: string) {
    const params: Record<string, string> = {};
    const segments = apiPath.split('/');
    const pathSegments = reqPath.split('/');

    for (let i = 0; i < segments.length; i++) {
        if (segments[i].startsWith(':')) {
            const paramName = segments[i].slice(1);
            params[paramName] = pathSegments[i];
        } else if (segments[i] === '*') {
            const paramName = '*';
            params[paramName] = pathSegments[i];
        }
    }

    if (queryParams) {
        const queryParamsArray = queryParams.split('&');
        queryParamsArray.forEach((queryParam) => {
            const [key, value] = queryParam.split('=');
            params[key] = value;
        });
    }

    return params;
}