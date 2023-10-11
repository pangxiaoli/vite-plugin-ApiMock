import { Connect } from 'vite';
import pathToRegex from './utils/pathtoRegex';
import { IncomingMessage, ServerResponse } from 'node:http';
import extractParams from './utils/extractParams';
import type { ApiData } from '../index';

/**
 * 创建API中间件
 * @param apilist - 包含API信息的数组
 */
export default function createApiMiddleware(apilist: ApiData[]): Connect.NextHandleFunction {
    return (req, res, next) => {
        const [path, queryParams] = req.url!.split('?');
        let requestBody = '';

        req.on('data', (chunk) => {
            requestBody += chunk;
        });
        req.on('end', () => {
            handleApiRequests(apilist, path, queryParams, requestBody, req, res, next);
        });
        req.on('error', () => {
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
    };
}

/**
 * 处理API请求
 * @param apilist - 包含API信息的数组
 * @param path - 请求路径
 * @param queryParams - 请求的查询参数
 * @param requestBody - 请求体内容
 * @param req - HTTP请求对象
 * @param res - HTTP响应对象
 * @param next - 后续处理函数
 */
function handleApiRequests(
    apilist: ApiData[],
    path: string,
    queryParams: string | undefined,
    requestBody: string,
    req: Connect.IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: Connect.NextFunction
) {
    for (const api of apilist) {
        const regex = pathToRegex(api.url);
        const match = path.match(regex);

        if (match && (req.method === (api.method ?? 'GET'))) {
            const params = extractParams(api.url, path, queryParams);
            setResponseHeaders(res, api.headers);

            const data = api.data;
            const body = req.method !== 'GET' ? JSON.parse(requestBody) : undefined;
            if (typeof data === 'function') {
                const result = data({ params, body, headers: req.headers });
                res.end(JSON.stringify(result));
            } else {
                res.end(JSON.stringify(data));
            }

            return;
        }
    }

    next();
}

/**
 * 设置响应头
 * @param res - HTTP响应对象
 * @param headers - 响应头信息
 */
function setResponseHeaders(res: ServerResponse<IncomingMessage>, headers?: Record<string, string>) {
    res.setHeader('Content-Type', 'application/json');

    if (headers) {
        Object.keys(headers).forEach((headerName) => {
            res.setHeader(headerName, headers[headerName]);
        });
    }
}
