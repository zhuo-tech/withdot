import 'vue-router'
import { RuleItem } from 'async-validator'


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
         * 菜单标题 / 页面 title / 页面 Tab 标签名称 <br>
         * Vue Router 要求 route.name 不能重复, 但是不同层级菜单有重名可能;
         * 为避免冲突, 建议优先使用这个字段展示 <br>
         * 实现要求:
         *  - 此字段优于 route.name 展示
         *  - 此字段不存在, 展示 name
         *  - name 仍不存在 展示 path
         */
        title?: string
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

    /**
     * 环境变量类型定义
     */
    interface ImportMetaEnv {
        VUE_APP_LAF_BASE_URL: string
        VUE_APP_LAF_DB_PROXY: string
    }

    /**
     * 表单验证规则
     */
    type FormValidationRules<T> = Partial<Record<keyof T, Array<RuleItem>>>

}
