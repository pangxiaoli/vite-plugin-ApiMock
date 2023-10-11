import { ViteDevServer } from 'vite';
import createApiMiddleware from './src/apiMiddleware'

export type ApiData = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    data: ((T: { params: any, body: any, headers: Record<string, string> }) => unknown) | unknown;
}

function createMockApi(apilist: ApiData[]) {
    return {
        name: 'vite-plugin-ApiMock',
        configureServer(server: ViteDevServer) {
            server.middlewares.use(createApiMiddleware(apilist));
        },
    };
}

export default createMockApi;
