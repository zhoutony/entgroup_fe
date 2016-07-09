## 项目说明

## 运行

### 本地调试

```sh
# 实时编译
npm run development-build
# 启动本地服务器（修改代码会自动重启服务器），启动成功后会提示 Listening on port 3000.
npm run development-server
```

### 线上发布

```sh
# 编译代码
npm run production-build
# 启动线上服务器，启动成功后会提示 Listening on port 3000.
npm run production-server
```

## 目录

1. `.`：项目根目录
2. `build`：编译结果目录
3. `build/assets`：前端文件目录
4. `build/server`：后端文件目录
5. `src`：源代码目录
6. `src/client`：前端入口目录
7. `src/common`：前后端共用（业务代码）目录
8. `src/common/actions`：动作目录
9. `src/common/components`：组件（页面中可复用的组件）目录
10. `src/common/containers`：容器（对应每个页面）目录
11. `src/common/reducers`：状态处理目录
12. `src/server`：后端入口目录
13. `webpack`：编译配置目录

## 风格

项目使用[EditorConfig](http://editorconfig.org/)进行文件格式和代码缩进设置，请安装对应的编辑器插件。

项目的业务代码基于`ES2015`编写，遵守[Airbnb的代码风格规范](https://github.com/airbnb/javascript)。项目使用`ESLint`进行代码检查，请自行安装对应的编辑器插件。在本地实时编译和线上发布编译过程中，也会对代码进行检查，并给出检查结果。

## 框架

整体上前后端技术同源，都基于`JavaScript`，所以需要注意的是业务代码的执行环境并不限定在浏览器中。

页面中的样式，使用`LESS`编写，在编译的过程中经过了[Autoprefixer](https://github.com/postcss/autoprefixer)的处理。

项目中用到的其他技术不一一列举了，请自行查询资料。

## 开发流程

开发功能：

1. 基于`master`分支拉取功能分支，并以`f-功能名`格式命名。
2. 编写功能代码
3. 自测
4. 提交测试

*注意：在开发功能的过程中，一旦`master`发生变更，请及时合并到功能分支。避免发布时出现代码冲突*

发布功能：

1. 基于`master`分支拉取发布分支，并以`r-日期和版本`格式命名（r-20160626-v1）。
2. 合并所有需要上线的功能分支
3. 编译和推送代码，启动服务器
4. 确认没有问题后，将发布分支合并回`master`分支
