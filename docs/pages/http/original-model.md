# 原始模型

- 浏览器请求静态资源 a.js。（请求头：1KB）
- 服务器读取磁盘文件 a.js，返给浏览器。（10KB（a.js）+1KB（响应头） = 11KB）
- 浏览器再次请求，服务器又重新读取磁盘文件 a.js，返给浏览器
- 如此循环。。

执行一个往返，流量为 10（a.js）+1（请求头）+1（响应头） = 12KB。
访问 10 次，流量大约为12 * 10 = 120KB

所以，流量与访问次数有关：
L（流量） = N（访问次数） * 12

该方式缺点很明显：
>浪费用户流量。
浪费服务器资源，服务器要读磁盘文件，然后发送文件到浏览器。
浏览器要等待 a.js 下载并且执行后才能渲染页面，影响用户体验。

## Node: service
```javascript
app.get('/', (req, res) => {
  const html = fs.readFileSync('index.html', 'utf-8')
  res.send(html)
})

app.get('/index.js', (req, res) => {
  const js = fs.readFileSync('index.js', 'utf-8')
  res.send(js)
})
```

HTML静态页面
```HTML
<script src="index.js"></script>
```
示例:每次刷新index.js都会重新发起请求,从服务器获取资源,不管这个文件是否发生过改变
> demo: cache-control-1


## 浏览器增加缓存机制
- 浏览器第一次请求 a.js，缓存 a.js 到本地磁盘。（1+10+1 =12KB）
- 浏览器再次请求 a.js，直接走浏览器缓存（200，from cache），不再向服务器发起请求。（0KB）
- ...

第一次访问，流量为 1+10+1 = 12KB

第二次访问，流量为 0。

。。。

第 10000 次访问，流量依然为 0。
所以流量与访问次数无关：
L（流量） = 12KB。
优点：

大大减少带宽。
由于减少了 a.js 下载时间，相应的提高了用户体验。

缺点：服务器上 a.js 更新时，浏览器感知不到，拿不到最新的 js 资源。

怎么拿到？

## 关于Hash
在webpack中有三种hash可以配置，分别是hash、chunkhash、contenthash，每一种都有不同应用场景,所以首先要搞清楚这三种的hash的区别

### hash
所有文件哈希值相同，只要改变内容跟之前的不一致，所有哈希值都改变，没有做到缓存意义

> demo cache-hash/hash
- 直接运行webpack看结果，所有文件hash都相同
- 如果我们改变修改chunk1.js中的代码
- 再运行webpack发现所有的hash都变化了
- 


### chunkhash
当有多个chunk，形成多个bundle时，如果只有一个chunk和一个bundle内容变了，其他的bundle的hash都会发生变化，因为大家都是公用的一个hash，这个时候chunkhash的作用就出来了。它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。

> 修改webpack.config.js里的hash为chunkhash

- 在运行webpack，两个chunk的hash并不相同了
- 在修改chunk1.js
- 再看webpack，只有修改过的chunk1的hash变化了，达到了我们预期的效果，对我们线上的缓存也是比较好的。

### contenthash
在打包的时候我们会在js中导入css文件，因为他们是同一个入口文件，如果我只改了js得代码，但是他的css抽取生成css文件时候hash也会跟着变换。这个时候contenthash的作用就出来了。

就是说当我们一个js文件里面引用了一个css文件，如果我么修改了css文件内的内容，我们css中的内容，会发发现这整个bundle的hash也会发生更新。
我们要引入css，并且要把css提出、压缩生成一个css文件，就要借助一个webpack的插件，叫做MiniCssExtractPlugin,他可以帮我提取css到css文件，并且压缩css。

> demo cache-hash/chunkhash

- 运行webpack，index.css和index.js的hash是一样的
- 修改style.css，运行webpack
- 只修改了style.css的文件，引入他的index.js确也更新了hash，这个时候就需要contenthash来发挥作用了
- 修改webpack.config.js，plugins里的chunkhash>contenthash
- 然后修改common.js，直接运行webpack
- 看到修改js时我们的css文件的hash并没有变更


> https://juejin.cn/post/6844903935812059144
> https://juejin.cn/post/6844903717574017031#heading-2
> https://juejin.cn/post/6844903517702848526
> https://web.dev/http-cache/