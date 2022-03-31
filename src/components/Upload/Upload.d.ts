export type LafUploadResponse = {
    code: number
    data: {
        // 例: /xxxx-xxxx-xxxx.jpg
        filename: string
        length: number
        metadata: {
            contentType: string
            name: string
            parent: string
        }
        uploadDate: string
        _id: string
    }
}
