import 'vue-router'


declare module 'vue-router' {

    /**
     * 扩展定义路由元数据
     */
    interface RouteMeta {

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
