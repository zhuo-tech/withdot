import { getOssSign } from '@/api/token'
import { LAF } from '@/config'
import axios from 'axios'

export async function uploadApi(file: File, onUploadProgress: (progressEvent: ProgressEvent) => void, ) {
    const fileName: string = `${Date.now()}${Math.floor(Math.random()*(10000-1000)+1000)}${file.name}`

    const ossUrl = await getOssSign(fileName, LAF.File_BUCKET_NAME)

    await axios.put(ossUrl, file, {
        headers: {
          'content-type': file.type,
        },
        onUploadProgress,
    })


    return `/public/${fileName}`
}
