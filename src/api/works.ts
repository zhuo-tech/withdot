import { cloud } from '@/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { LogicDelete } from '@/model/LogicDelete'
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
        return ElMessage.error(r.error)
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
        return ElMessage.error(res.error)
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
            delFlag: LogicDelete.NORMAL,
        })
    if (!res.ok) {
        ElMessage.error(res.error)
        return
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
        delFlag: LogicDelete.NORMAL,
    }
    const r = await DB.collection(CoreWork.TABLE_NAME)
        .where(whereFlag)
        .count()
    if (!r.ok) {
        return ElMessage.error(r.error)
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
        return
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
            delFlag: LogicDelete.NORMAL,
            _id: id,
        })
        .remove()
    if (!res.ok) {
        ElMessage.error(res.error)
        return
    }
}

export async function workList(page: any) {
    const r = await DB.collection(CoreWork.TABLE_NAME)
        .where({
            delFlag: LogicDelete.NORMAL,
        })
        .count()
    if (!r.ok) {
        ElMessage.error(r.error)
        return
    }

    const res = await DB.collection(CoreWork.TABLE_NAME)
        .where({
            delFlag: LogicDelete.NORMAL,
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
        return
    }
    return {
        list: res.data,
        total: r.total,
        current: page.current,
        pageSize: page.pageSize,
    }
}

export async function addWorkToAlbums(data: any, _id: string) {
    const {workId} = data
    const r = await DB.collection(CoreWork.TABLE_NAME)
        .where({
            _id: workId,
            delFlag: LogicDelete.NORMAL,
        })
        .getOne()
    if (!r.ok) {
        ElMessage.error(r.error)
        return
    }
    const list = r.data
    const res = await DB.collection(CoreAlbum.TABLE_NAME)
        .where({
            _id: _id,
            delFlag: LogicDelete.NORMAL,
        })
        .getOne()
    if (!res.ok) {
        ElMessage.error(res.error)
        return
    }
    const albumsData = res.data
    const _ = DB.command
    const addRes = await DB.collection(CoreAlbum.TABLE_NAME)
        .where({
            _id: _id,
            delFlag: LogicDelete.NORMAL,
        })
        .update({
            workList: albumsData.workList ? _.push(list) : [list],
        })
    if (!addRes.ok) {
        ElMessage.error(res.error)
        return
    }
}
