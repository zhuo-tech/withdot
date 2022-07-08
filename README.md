# 微草轻课
  基于laf开发的`交互式视频`创作平台
 
# 技术选型
## [lafyun](https://www.lafyun.com)
  `Life is short, you need laf :) 像写博客一样写函数，随手上线`
  `Vue 3 + Typescript + Vite`

# 模块说明
    withdot
    ├── .vscode -- vscode配置
    ├── env -- 环境配置
    ├── public   -- 公共资源目录
    ├── src -- 源代码
    ├    ├── api -- 云函数接口
    ├    ├── assets  -- 静态资源
    ├    ├── components -- 公共组件库
    ├    ├── mixin -- 通用 CRUD 管理页面
    ├    ├── model -- 通用模型定义
    ├    ├── pages -- 页面布局&数据逻辑处理
	├	 ├     └── accounts --账户管理
	├	 ├     └── albums -- 专辑管理	
    ├	 ├     └── Error -- 错误处理	
    ├	 ├     └── home -- 首页数据看板
    ├	 ├     └── materials -- 素材管理（图片、视频、音频等）
    ├	 ├     └── pay -- 支付管理（支付渠道｜商品订单｜交易流水｜支付通知）
    ├	 ├     └── question -- 题目管理（判断题｜解答题｜选择题｜填空题｜单选题｜多选题）
    ├	 ├     └── settings -- 通用配置
    ├	 ├     └── student -- 学员管理
    ├	 ├     └── system -- 通用用户权限管理
    ├	 ├     └── weixin -- 微信公众平台管理
    ├	 ├     └── works -- 制作作品
    ├    ├── service -- 通用服务
    ├    ├── store -- 状态
    ├    ├── tool -- 工具
    ├    ├── utils -- 常用的帮助工具类
    ├    ├── App.tsx -- 应用配置
    ├    ├── cloud.ts -- laf集成
    ├    ├── config.ts -- 应用通用配置
    ├    ├── env.d.ts -- 环境配置
    ├    ├── index.css -- 样式
    ├    ├── main.ts -- 入口
    ├    ├── router.ts -- 路由
    ├    ├── shims-vue.d.ts - 忽略
    ├    ├── types.ts -- 类型定义
    ├── .editorconfig  -- 开发配置
    ├── .gitattributes
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts



# 功能

- [x] 素材管理
    1.  [x] 图片
    2.  [x] 视频
    3.  [x] 音频
- [x] 题库管理
    1.  [x] 单选题
    2.  [x] 多选题
    3.  [x] 判断题
    4.  [x] 简答题
    5.  [x] 选择题
    6.  [x] 填空题
- [x] 作品制作
    1. [x] 答题
    2. [x] 书签
    3. [x] 插画
    4. [x] 文本
    5. [x] 热区
    6. [x] 链接
    7. [ ] 投票
    8. [ ] 问卷
    9. [ ] 反馈
    10. [ ] 笔记
- [x] 专辑售卖
- [x] 支付中心
    1. [x] 支付渠道（微信支付）
    2. [x] 支付订单
    3. [x] 交易流水
    4. [x] 支付通知
- [x] 学员管理
- [x] 系统管理
   1. [x] 用户管理
   2. [x] 角色管理
   3. [x] 权限管理 
- [ ] 微信公众平台

# 预览
![image](https://user-images.githubusercontent.com/11770232/177938839-2224f47e-d461-4636-8f82-c74aa15a3dc6.png)
![image](https://user-images.githubusercontent.com/11770232/177939129-3f2836da-8c56-456f-bf43-126f8c6dd302.png)
![image](https://user-images.githubusercontent.com/11770232/177939258-b9ba0133-0df3-4279-9404-6c47408faf97.png)
![image](https://user-images.githubusercontent.com/11770232/177938743-9eaef5b6-c2a1-4c96-bc65-04b8aa2322aa.png)
