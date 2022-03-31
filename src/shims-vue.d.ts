import 'vue-router'


declare module 'vue-router' {

    /**
     * 扩展定义路由元数据
     */
    interface RouteMeta {
        /**
         * 侧边栏菜单图标
         */
        icon?: any
        /**
         * 是否展示在菜单中, 必须明确指定为 true 才会展示
         */
        isMenu?: boolean
    }
}

declare module 'async-validator' {
    interface RuleItem {
        /**
         * element 扩展的属性, 决定验证的时机
         */
        trigger?: 'blur' | 'change' | string,
    }
}

declare global {

}
