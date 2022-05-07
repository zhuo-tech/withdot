/**
 * @see https://cn.vitejs.dev/config/#envprefix
 */
const ENV_CONSTANT = import.meta.env

/**
 * 额外转换一层, 避免其他位置直接依赖 ENV 属性 key
 */
export const LAF = {
    BASE_URL: ENV_CONSTANT.VUE_APP_LAF_BASE_URL,
    DB_PROXY: ENV_CONSTANT.VUE_APP_LAF_DB_PROXY,
    FILE_URL: ENV_CONSTANT.VUE_APP_LAF_FILE
}
