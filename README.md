# h5-web

**Vue(按需加载组件)** 
**Vant(按需引入)** 
**Rem适配** 

---

### 概要
1. 封装了APP通讯方法、swiper组件、list组件
2. 使用quill展示文章
3. 使用lottie展示动画
4. 提供了相应示例

---
### 项目目录结构

```
h5-web
├── dist              # 打包后的文件目录
├── node_modules      # 第三方依赖包
├── public            # 公共文件
├── script            # 构建时所需的脚本目录
├── src               # 项目源码
│   ├── components    # 公用组件目录
│   │   └── swiper    # 封装了切换时高度可变的swiper组件
│   │   └── list      # 封装了list组件
│   ├── router        # 路由配置目录
│   ├── store         # vuex 的 store
│   ├── utils         # 工具相关
│   │       └── request.js    # 封装了Axios
│   │       └── tools.js      # 封装了与IOS、Android APP 通讯方法
│   └── views         # 项目页面目录
│   │   └── example    # 示例
│   │       └── page-article.vue    # 使用quill展示文章、lottie使用动画
│   │       └── page-article.vue    # 使用list逐渐展示列表
│   │       └── page-article.vue    # 使用swiper切换
```

---
