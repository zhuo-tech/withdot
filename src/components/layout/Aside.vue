<script lang="tsx">
import { getLogger } from '@/main'
import { router } from '@/router'
import { CollUtil, StrUtil } from 'typescript-util'
import { defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * 对 {@code isMenu} 的实现: router.meta.isMenu !== false 意味着所有菜单默认显示, 除非指定 false
 * 对 {@code flatChildren} 的实现, 仅支持展开叶节点的上一级. 如果有更深嵌套 会被丢弃
 * 暂未支持分组菜单, 可能 el-menu-item-group 和 groupBy 可以实现
 *
 * @see <a href="/src/shims-vue.d.ts">扩展类型定义</a>
 * @author LL
 * @date 2022年4月1日 01点20分
 */
export default defineComponent({
    name: 'Aside',
    props: {
        collapse: {
            type: Boolean,
        },
    },
    data() {
        return {
            log: getLogger('侧边栏'),
        }
    },
    computed: {
        menuList() {
            return router.options.routes.filter(i => i.meta?.isMenu !== false)
        },
    },
    methods: {

        onSelect(index: string) {
            this.log.trace('Select => ', index)
            // this.$router.push({path: param})
            this.$emit('select', index)
        },

        expectStartWith(str: string, expect: string = StrUtil.PATH_INTEGRAL) {
            return str.startsWith(expect) ? str : expect + str
        },

        renderMenuItem(menu: RouteRecordRaw, rootPath: string = StrUtil.EMPTY) {
            // 没有子菜单: 一级菜单
            let {children, path} = menu
            path = rootPath + this.expectStartWith(path)
            if (CollUtil.isEmpty(children)) {
                return this.renderMenuNode(path, path, menu)
            }
            // 只有唯一子菜单
            if (children?.length === 1) {
                const uniqueSubmenu = children[0]
                const index = path + this.expectStartWith(uniqueSubmenu.path)
                return this.renderMenuNode(index, index, uniqueSubmenu)
            }

            // 父级节点要求展开
            if (menu.meta?.flatChildren) {
                return menu.children?.map(i => {
                    const index = path + this.expectStartWith(i.path)
                    return this.renderMenuNode(index, index, i)
                })
            }

            // 多个子菜单
            const titleSlot = {
                title: () => {
                    const Icon = menu.meta?.icon
                    return (
                        <div>
                            <el-icon>{ Icon && <Icon></Icon> }</el-icon>
                            <span>{ menu.name }</span>
                        </div>
                    )
                },
            }
            return (
                <el-sub-menu index={ path } v-slots={ titleSlot }>
                    {
                        children?.filter(i => i?.meta?.isMenu !== false)
                            .map(i => this.renderMenuItem(i, path))
                    }
                </el-sub-menu>
            )
        },

        /* 独立渲染一个菜单叶子节点 */
        renderMenuNode(key: string, index: string, menu: RouteRecordRaw): JSX.Element {
            const Icon = menu.meta?.icon
            return (
                <el-menu-item key={ 'menu' + key } index={ index }>
                    <el-icon>{ Icon && <Icon></Icon> }</el-icon>
                    <span>{ menu.name }</span>
                </el-menu-item>
            )
        },

    },
    render() {
        const {collapse} = this.$props
        const {menuList} = this
        return (
            <el-menu
                class="h-full"
                default-active="/"
                collapse={ collapse }
                router={ true }
                onSelect={ this.onSelect }>
                { menuList.map(router => this.renderMenuItem(router)) }
            </el-menu>
        )
    },
})
</script>

<style lang="less" scoped>
.menu-label {
@apply text-gray-500;
@apply font-light;
@apply text-xs;
}
</style>
