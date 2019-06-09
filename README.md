## his 前端项目

基于vue框架的his前端项目

IDE统一采用WebStorm

### 0 技术栈说明

#### 0.1 技术
1. vue: 本次开发的主要框架
2. bootstrap: 本次开发的组件库
3. vue-bootstrap: 将bootstrap集成到vue框架中
4. vue-router: 控制前端路由
5. vuex: 前端存储库
6. axios: 发送ajax请求
7. mockjs: 模拟数据
8. vee-validate: 表单验证
9. core-ui: 本次开发的前端模板

#### 0.2 工具
1. vue-cli: 前端脚手架
2. webpack: 打包工具
3. npm

### 1 构建方式

#### 1.1 准备工作

1. 安装node获得附带的npm(此步骤略)

2. 安装vue脚手架(vue-cli)
````bash
npm install vue-cli -g
````

3. 下载并安装webstorm

#### 1.2 开始构建
1. git clone
```bash
git clone git@github.com:hosoneu/his_Vue.git
```

2. 切到下载后的目录
``` bash
cd his_Vue
```
3. 安装依赖
````bash
npm install --registry https://registry.npm.taobao.org --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
````

4. 启动服务
````bash
npm run serve
````

### 2 目录说明

#### 2.1 根目录

- `package.json`: 工程依赖的定义

- `vue.config.js`: 一部分vue配置

#### 2.2 src目录

此目录为项目的主要工作目录，主要代码都在此处编写

- `main.js`: 程序的主入口，负责导入全局资源，全局配置等

- `App.vue`: 根组件

- `_nav.js`: 定义导航栏组件的路由配置

- `assets`: 静态文件

- `config`: 部分配置文件

- `container`: 一些默认的容器组件

- `mock`: 模拟服务器

- `router`: vue-router路由定义

- `shared`: 不知道

- `store`: vuex存储定义

- `views`: 项目使用的组件

#### 2.3 node_modules目录

此目录下是项目的依赖库，不必深究

#### 2.4 public目录

一些静态资源，不必深究

### 3 其他

1. 登录做的比较简单，只要用户名和密码都不为空，则有一半的概率登录成功，可多尝试几次
