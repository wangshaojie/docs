# 引子
---
缓存机制无处不在，有客户端缓存，服务端缓存，代理服务器缓存等。在HTTP中具有缓存功能的是浏览器缓存，HTTP缓存作为web性能优化的重要手段。通过网络获取资源既慢又费流量（移动端）,大量响应需要在浏览器和服务器之间进行多次往返。直到页面的所有关键资源全部下载完毕，页面才会加载。而且如果是移动端,网络不好的情况下,除了浪费流量,访问更是个问题

如何避免不必要的网络请求?浏览器的HTTP缓存是第一步要做的。他是对缓存响应的生命周期控制，它很有效，所有浏览器都支持它，而且不需要做太多工作。

所以,我们这次分享的就是HTTP缓存实现的相关知识