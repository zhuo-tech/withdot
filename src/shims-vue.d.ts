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
         * 是否展示在菜单中, 必须明确指定为 false 才会隐藏; undefined 和 true 都会展示
         */
        isMenu?: boolean
        /**
         * 如果子菜单非空, 展开子菜单到上一级; 隐藏自身
         */
        flatChildren?: boolean
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
