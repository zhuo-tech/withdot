import { getOssSign } from '@/api/token'
import { LAF } from '@/config'

export async function uploadApi(file: File, ) {
    const fileName: string = `${Date.now()}${Math.floor(Math.random()*(10000-1000)+1000)}${file.name}`
    const ossUrl = await getOssSign(fileName, LAF.File_BUCKET_NAME)
    const response = await fetch(ossUrl, {
        body: file,
        method: "PUT",
    })
    if(!response.ok){
        throw new Error('错误')
    }
    return `/public/${fileName}`
}
