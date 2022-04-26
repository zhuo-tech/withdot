import { CoreWork } from '@/model/entity/CoreWork'
import { RuleItem } from 'async-validator'
import { FormInstance } from 'element-plus'
import { LafClient } from 'laf-db-query-wrapper'
import { reactive, ref, Ref, watchEffect } from 'vue'

const formRule: Partial<Record<keyof CoreWork, Array<RuleItem>>> = {}

type PropsType = {
    data: CoreWork
}

export type WorkBaseFormReturn = {
    isShow: Ref<boolean>
    formData: Pick<CoreWork, '_id' | 'covers'>
    formRule: Partial<Record<keyof CoreWork, Array<RuleItem>>>
    formIsLoading: Ref<boolean>
    show(): void
    close(): void
    submit(): void
}

/**
 * @author LL
 * @date 2022年04月26日 12点54分
 */
export function useWorkBaseForm(formRef: Ref<FormInstance>, props: PropsType): WorkBaseFormReturn {
    const isShow = ref(false)
    const formIsLoading = ref(false)
    const formData = reactive<Pick<CoreWork, '_id' | 'covers'>>({
        _id: '',
        covers: {} as any,
    })

    watchEffect(() => {
        const {_id, covers} = props.data
        formData._id = _id
        formData.covers = covers ?? {}
    })

    return {
        isShow,
        formData,
        formRule,
        formIsLoading,
        show() {
            isShow.value = true
        },
        close() {
            isShow.value = false
        },
        submit() {
            formRef.value.validate()
                .then(() => {
                    formIsLoading.value = true
                    const {_id, covers} = formData
                    new LafClient<CoreWork>(CoreWork.TABLE_NAME)
                        .updateById(_id, {covers})
                        .then(() => this.close())
                        .catch(err => console.error(err))
                        .finally(() => formIsLoading.value = false)
                })
                .catch(err => {
                    console.warn('验证不通过', err)
                })
        },
    }
}
