export class CloudFunctionResult<T = any> {
    private static readonly CODE_OK = '0'

    code: string
    error?: string
    data?: T

    public static getDate<E>(res: CloudFunctionResult<E>): E {
        const {code, data, error} = res
        if (code === this.CODE_OK) {
            return data as E
        }
        throw new Error(error ?? 'CloudFunctionResultError')
    }
}
