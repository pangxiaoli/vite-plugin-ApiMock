# vite-plugin-ApiMock

[中文](./README.md) | **English**

A lightweight and non-intrusive mock solution for Vite, simulating different HTTP requests and returning predefined data.

## 📌 Features

- 🛡️ Non-intrusive: Achieves same-origin API using Connect middleware.
- ⚖️ Supports RESTful APIs.
- 🛠️ Flexible response data: Customize response data and headers.
- 🔐 Provides complete type declaration files.

## 🐳 Environment

- node >= 16.0
- vite >= 2.0

## 🪝 Install

```bash
npm i -D vite-plugin-ApiMock
```
```bash
yarn add -D vite-plugin-ApiMock
```
```bash
pnpm add -D vite-plugin-ApiMock
```

## 🚩 Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import createMockApi from 'vite-plugin-ApiMock'
import { ApiData } from "vite-plugin-apiMock";

const apiList: ApiData[] = [
    {
        url: '/zoos',
        method: 'GET', // Defaults to 'GET'
        data: [{id: 0, name: 'zoo0'}],
    },
    {
        url: '/zoos/:id',
        method: 'PUT',
        headers: { // Defaults to 'Content-Type' as 'application/json'
            'X-Custome-Id': 'xxx',
        }
        data: ({params, body, headers}) => {
            // Params include id and other URL params
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