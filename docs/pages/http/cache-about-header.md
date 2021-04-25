# 缓存相关header
---

## 私有缓存和共享缓存

- 共享缓存：可被多个用户重复使用，例如 redis 缓存热点数据，CDN 缓存静态资源
- 私有缓存：只能被单个用户使用，例如浏览器缓存

# 缓存决策
## 强制缓存
强制缓存分为两种情况，Expires和Cache-Control
### Expires
Expires的值是服务器告诉浏览器的缓存过期时间，即下一次请求时，如果浏览器端的当前时间还没有到达过期时间，则直接使用缓存数据。下面通过我们的Express服务器来设置一下Expires响应头信息

<img :src="$withBase('/expires.png')" alt="Expires">

:::tip
Expires是HTTP1.0的产物，故现在大多数使用Cache-Control替代
:::


## 协商缓存
当缓存失效时，会发出 条件式请求，这时候和服务器的通信就称为协商缓存

协商缓存的优点：

- 省去了服务器生成 html 的时间
- 省去了响应体内容，传输更快

### Last-Modified
请求响应流程：

- 当浏览器第一次请求服务器时，服务器会返回 Last-Modified 头部表明当前资源的最后修改日期
- 浏览器会将这个日期值缓存在本地
- 当需要发出 条件请求 时，将日期值放在 If-Modified-Since 或 If-Unmodified-Since 头部中向服务器发出
- 服务器判断日期，决定响应内容
- 如果该资源新鲜，则返回 304，客户端使用该缓存渲染内容
- 如果该资源被更改过，则返回 200，及全新内容


# Etag
和 Last-Modified 的请求响应流程类似，不同的是服务器响应的是 ETag 头，浏览器发出请求时的头部为 If-Match 和 If-None-Match

- 强验证：HTTP 协议默认使用强验证，强验证要求文档的每一个字节都必须相同
```ETag: "618bbc92e2d35ea1945008b42799b0e7"```
- 弱验证：ETag 头以 W/ 开头时为弱验证，此时只要求文档的内容含义是相同的。
```ETag: W/"618bbc92e2d35ea1945008b42799b0e7"```

因为存在当资源时间更改，但是内容未改变等情况，Last-Modified 对资源的判断没有 ETag 准确，所以服务端处理的时候通常优先判断 ETag
## 缓存控制

### HTTP header: Cache-control
---
在 HTTP/1.1 中引入 Cache-control 头用来定义浏览器应该如何进行缓存决策

Cache-control 的值有：

- no-store：客户端不得存储任何关于客户端请求和服务端响应的内容。每次由客户端发起的请求都会下载完整的响应内容
- no-cache：客户端会缓存响应内容，但每次请求都会携带 验证字段 到服务器，验证缓存是否过期，未过期才使用本地已缓存内容
- public：响应内容可以被中间人如 CDN、网关等缓存
- private：响应内容只能被客户端缓存
- max-age：缓存过期的相对时间（秒），超过该时间后会再次发起请求
- must-revalidate：本地缓存未过期时使用本地缓存，本地缓存过期时必须携带 验证字段 到服务器，验证缓存是否过期

Expries是 HTTP/1.0 中的内容，作用是指定缓存过期的绝对时间，例如 Expires: Wed, 21 Oct 2015 07:28:00 GMT

和 Cache-control: max-age 的区别：

Expries 是绝对时间，Cache-control 是相对时间,
在 HTTP/1.0 中 Expries 优先级大于 Cache-control，在 HTTP/1.1 及以后 Cache-control 优先级大于 Expries