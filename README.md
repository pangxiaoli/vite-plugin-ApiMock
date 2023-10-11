# vite-plugin-apimock

**中文** | [English](./README.en_US.md)

用于 vite 的轻量级无侵入 mock 方案，模拟不同HTTP请求并返回预定义的数据

## 📌 特性

- 🛡️ 无侵入：借助 connect 中间件实现的同源 api
- ⚖️ 支持 RESTful api
- 🛠️ 灵活的响应数据：自定义响应数据、响应头
- 🔐 提供完整类型声明文件

## 🐳 环境

- node >= 16.0
- vite >= 2.0

## 🪝 安装

```bash
npm i -D vite-plugin-apimock
```
```bash
yarn add -D vite-plugin-apimock
```
```bash
pnpm add -D vite-plugin-apimock
```

## 🚩 用法

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import createMockApi from 'vite-plugin-apimock'
import { ApiData } from "vite-plugin-apimock";

const apiList: ApiData[] = [
    {
        url: '/zoos',
        method: 'GET', // 缺省为 'GET'
        data: [{id: 0, name: 'zoo0'}],
    },
    {
        url: '/zoos/:id',
        method: 'PUT',
        headers: { // 缺省的 'Content-Type' 为 'application/json'
            'X-Custome-Id': 'xxx',
        }
        data: ({params, body, headers}) => {
            // params 包括了 id 以及其他 url params
            return {}
        }
    }，
    {
        url: '/zoos/:id/animals/:id',
        method: 'DELETE',
        data: {state: 200, msg: 'success', data: {}}
    }
]

export default defineConfig({
  plugins: [
    createMockApi(apiList)
  ]
})
```

## License

MIT