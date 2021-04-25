module.exports = {
  base: "/docs/",
  title: "以前是王",
  description: "一些文档",
  themeConfig: {
    lineNumbers: false,
    lastUpdated: true,
    nav: require("./nav"),
    sidebar: [
      { 
        title: "引子", 
        path: '/pages/http/overview'
      },
      {
        title: 'HTTP请求的基本概念',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          "/pages/http/web-server",
          "/pages/http/cors" // 这里只写路径,他会自己把md文件里的标题作为侧边栏菜单名称
        ]
      },
      {
        title: 'HTTP缓存',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          "/pages/http/flowcharts",
          "/pages/http/cache-strategy",
          "/pages/http/original-model",
          "/pages/http/cache-about-header",
          "/pages/http/priority-of-cache",
          "/pages/http/browser-about-cache",
          "/pages/http/expires",
          "/pages/http/last-modified",
          "/pages/http/cache-contorl",
          "/pages/http/etag",
          "/pages/http/best-plan"
        ]
      },
      {
        title: '浏览器缓存',
      }
    ],
    repo: "wangshaojie/docs",
  },

  plugins: {
    "@vuepress/back-to-top": {},
  },
};
