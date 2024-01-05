中文 | [English](https://github.com/manyuemeiquqi/vue-tsx-admin/tree/master)

## Vue TSX Admin

![logo-8b7cc132.svg](https://cdn.nlark.com/yuque/0/2024/svg/22817409/1704071810855-a476e977-aa08-4521-9072-25398ea3cc29.svg#clientId=u14b4c0c0-88b6-4&from=drop&id=uc834b898&originHeight=64&originWidth=64&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3466&status=done&style=none&taskId=u4e913108-1538-44fd-826a-f6da0e4e91e&title=)

### 简介

[Vue TSX Admin](https://github.com/manyuemeiquqi/vue-tsx-admin) 是一个免费开源的中后台管理系统模块，UI 参考 acro design pro + ant design pro，它使用了最新的前端技术栈，完全采用 Vue3 + TSX 的模式进行开发，提供了开箱即用的中后台前端解决方案，内置了 i18n 国际化解决方案，可配置化布局，主题色修改，权限验证，提炼了典型的业务模型，可以帮助你快速搭建起一个中后台前端项目。

主要的开发方案为：

- CSS 方案 modules css + tailwind
- 网络请求 axios
- 鉴权方案 token + jwt
- 模拟数据方案 mockjs
- 全局数据状态管理 pinia
- ui 组件库 arco desigin vue
- 工具库 lodash vue-use
- 国际化切换方案 vue-i18n
- 打包方案+静态服务器 vite

### 预览地址

[访问地址](https://manyuemeiquqi.github.io/vue-tsx-admin/)

> 登录用户名： admin
>
> 密码：admin
>
> 登录用户名：user
>
> 密码： user

[代码地址](https://github.com/manyuemeiquqi/vue-tsx-admin)

### 安装使用

- 项目条件
  - Node.js 18+
  - pnpm 8.5.0
- 使用

```javascript
# 克隆项目
git clone https://github.com/manyuemeiquqi/vue-tsx-admin.git

# 进入项目目录
cd vue-tsx-admin

# 安装依赖
pnpm install

# 启动服务
pnpm run dev
```

浏览器访问： [http://localhost:5173/vue-tsx-admin/](http://localhost:5173/vue-tsx-admin/) 即可

- 发布

```javascript
pnpm run build
```

- 其他

```javascript
# husky 安装
pnpm run husky

# 格式化
pnpm run format

# 代码 lint + fix
pnpm run lint
pnpm run lint-style

```

### 浏览器支持

- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88
- Vue3 不支持 IE

### 关于 Vue JSX 的性能问题

可参考 [https://github.com/krausest/js-framework-benchmark/pull/1546#issuecomment-1872904990](https://github.com/krausest/js-framework-benchmark/pull/1546#issuecomment-1872904990)

如果你对为什么使用 Vue + TSX 进行中后台开发感兴趣，可参考 [🎉Vue TSX Admin, 中后台管理系统开发的新方向](https://juejin.cn/post/7318446251631804467)

### 演示

![动画.gif](https://cdn.nlark.com/yuque/0/2024/gif/22817409/1704072677179-76719f50-5e8a-4f7f-aaab-b1e3952ef6d5.gif#averageHue=%23d5c9b1&clientId=uf128b628-9083-4&from=drop&id=u79f05bb4&originHeight=1007&originWidth=1919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2616308&status=done&style=none&taskId=u01bc0557-2a52-4e92-8d81-02530d08ada&title=)

### 作者

[manyuemeiquqi](https://github.com/manyuemeiquqi/vue-tsx-admin/commits?author=manyuemeiquqi)

### License

[MIT License](https://github.com/manyuemeiquqi/vue-tsx-admin?tab=MIT-1-ov-file)

最后，如果本项目帮助到你，希望你可以帮作者点个 [star](https://github.com/manyuemeiquqi/vue-tsx-admin?tab=readme-ov-file) ⭐ 表示鼓励
如果你发现项目 [bug](https://github.com/manyuemeiquqi/vue-tsx-admin/issues) ，欢迎提 [PR](https://github.com/manyuemeiquqi/vue-tsx-admin/pulls) , 感谢 🤞

---
