import { cloud } from '@/cloud'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import exp from 'constants'
import { ElMessage } from 'element-plus'

const DB = cloud.database()

/**
 * 获得素材列表
 * @param page
 * @returns {Promise<{total: number, current: any, pageSize: any, list: any[]}>}
 */
export async function materialList(page: any) {
    const r = await DB.collection(CoreMaterial.TABLE_NAME)
        .where({
            type: /^video/,
        })
        .count()
    if (!r.ok) {
        ElMessage.error(r.error)
    }

    const res = await DB.collection(CoreMaterial.TABLE_NAME)
        .where({
            type: /^video/,
        })
        .page({
            current: page.current,
            size: page.pageSize,
        })
        .orderBy('createTime', 'desc')
        .orderBy('_id', 'asc')
        .get()
    if (!res.ok) {
        ElMessage.error(res.error)
    }
    return {
        list: res.data,
        total: r.total,
        current: page.current,
        pageSize: page.pageSize,
    }
}

/**
 * 添加作品
 * @param params
 * @returns {Promise<void>}
 */
export async function addWork(params: any) {
    const res = await DB.collection(CoreWork.TABLE_NAME)
        .add({
            name: params.name,
            profile: '',
            content: '',
            material_id: params.materialId,
            createBy: '',
            createTime: Date.now(),
            updateBy: '',
            updateTime: Date.now(),
            delFlag: '0',
        })
    if (!res.ok) {
        ElMessage.error(res.error)
    }
}

/**
 * 分页 搜索 查询 表格数据
 * @param page
 * @param query
 * @returns {Promise<{current: any, total: number, data: any[], size: any}>}
 */
export async function dataList(page: any, query: any) {
    const whereFlag = {
        delFlag: '0',
    }
    const r = await DB.collection(CoreWork.TABLE_NAME)
        .where(whereFlag)
        .count()
    if (!r.ok) {
        ElMessage.error(r.error)
    }
    const res = await DB.collection(CoreWork.TABLE_NAME)
        .where(whereFlag)
        .page({
            current: page.current,
            size: page.size,
        })
        .orderBy('createTime', 'desc')
        .orderBy('_id', 'asc')
        .get()
    if (!res.ok) {
        ElMessage.error(res.error)
    }
    return {
        data: res.data,
        current: page.current,
        size: page.size,
        total: r.total,
    }
}

export async function del(id: string) {
    const res = await DB.collection(CoreWork.TABLE_NAME)
        .where({
            delFlag: '0',
            _id: id,
        })
        .remove()
    if (!res.ok) {
        ElMessage.error(res.error)
    }
}
