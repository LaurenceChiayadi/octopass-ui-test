/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as OrderIndexImport } from './routes/order/index'
import { Route as CustomerIndexImport } from './routes/customer/index'
import { Route as OrderOrderIdImport } from './routes/order/$orderId'
import { Route as CustomerCustomerIdImport } from './routes/customer/$customerId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OrderIndexRoute = OrderIndexImport.update({
  id: '/order/',
  path: '/order/',
  getParentRoute: () => rootRoute,
} as any)

const CustomerIndexRoute = CustomerIndexImport.update({
  id: '/customer/',
  path: '/customer/',
  getParentRoute: () => rootRoute,
} as any)

const OrderOrderIdRoute = OrderOrderIdImport.update({
  id: '/order/$orderId',
  path: '/order/$orderId',
  getParentRoute: () => rootRoute,
} as any)

const CustomerCustomerIdRoute = CustomerCustomerIdImport.update({
  id: '/customer/$customerId',
  path: '/customer/$customerId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/customer/$customerId': {
      id: '/customer/$customerId'
      path: '/customer/$customerId'
      fullPath: '/customer/$customerId'
      preLoaderRoute: typeof CustomerCustomerIdImport
      parentRoute: typeof rootRoute
    }
    '/order/$orderId': {
      id: '/order/$orderId'
      path: '/order/$orderId'
      fullPath: '/order/$orderId'
      preLoaderRoute: typeof OrderOrderIdImport
      parentRoute: typeof rootRoute
    }
    '/customer/': {
      id: '/customer/'
      path: '/customer'
      fullPath: '/customer'
      preLoaderRoute: typeof CustomerIndexImport
      parentRoute: typeof rootRoute
    }
    '/order/': {
      id: '/order/'
      path: '/order'
      fullPath: '/order'
      preLoaderRoute: typeof OrderIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/customer/$customerId': typeof CustomerCustomerIdRoute
  '/order/$orderId': typeof OrderOrderIdRoute
  '/customer': typeof CustomerIndexRoute
  '/order': typeof OrderIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/customer/$customerId': typeof CustomerCustomerIdRoute
  '/order/$orderId': typeof OrderOrderIdRoute
  '/customer': typeof CustomerIndexRoute
  '/order': typeof OrderIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/customer/$customerId': typeof CustomerCustomerIdRoute
  '/order/$orderId': typeof OrderOrderIdRoute
  '/customer/': typeof CustomerIndexRoute
  '/order/': typeof OrderIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/customer/$customerId'
    | '/order/$orderId'
    | '/customer'
    | '/order'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/customer/$customerId' | '/order/$orderId' | '/customer' | '/order'
  id:
    | '__root__'
    | '/'
    | '/customer/$customerId'
    | '/order/$orderId'
    | '/customer/'
    | '/order/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CustomerCustomerIdRoute: typeof CustomerCustomerIdRoute
  OrderOrderIdRoute: typeof OrderOrderIdRoute
  CustomerIndexRoute: typeof CustomerIndexRoute
  OrderIndexRoute: typeof OrderIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CustomerCustomerIdRoute: CustomerCustomerIdRoute,
  OrderOrderIdRoute: OrderOrderIdRoute,
  CustomerIndexRoute: CustomerIndexRoute,
  OrderIndexRoute: OrderIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/customer/$customerId",
        "/order/$orderId",
        "/customer/",
        "/order/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/customer/$customerId": {
      "filePath": "customer/$customerId.tsx"
    },
    "/order/$orderId": {
      "filePath": "order/$orderId.tsx"
    },
    "/customer/": {
      "filePath": "customer/index.tsx"
    },
    "/order/": {
      "filePath": "order/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
