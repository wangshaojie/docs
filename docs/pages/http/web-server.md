# 和HTTP相关Web服务器
---

  HTTP进行通信时，除了客户端和服务器端这两个之外，还有一些用于通信数据转发的应用程序。例如代理、网关、隧道和缓存。

## 代理(Nginx,Apache)
代理是一种具有转发功能的应用程序，它存在于客户端和服务器端之间，相当于一个中间人。它将客户端发送过来的请求并转发给服务器端。当然，它也会将服务器端返回的响应转发给客户端。

<img :src="$withBase('/web.png')" alt="代理">

## 网关
网关是一种特殊的服务器，作为其他服务器的中间实体使用。服务网关是在微服务前边的屏障，请求先到网关，网关会进行过滤，校验等处理，提高了微服务的安全性，拦截不合法请求，拒绝访问

<img :src="$withBase('/网关.jpeg')" alt="网关">


## 隧道
隧道是可按要求建立一条和其他服务器的通信线路，到时候使用 SSL 加密进行通信。隧道的目的是保证客户端和服务器进行安全的通信。可以理解为HTTP+SSL就是HTTPS

<img :src="$withBase('/隧道.png')" alt="隧道">