import { getLogger } from '@/main'
import { Request } from '@/tool/hooks/useTableList'
import { ElMessage, FormInstance } from 'element-plus/lib/components/index'
import { CollUtil, ObjectUtil } from 'typescript-util'
import { ref, Ref } from 'vue'

type FormInitConfig<T> = {
    formData: Partial<T>
    submitComplete(res: any, isAdd: boolean): void
}

export type ModalFormReturn<T> = {
    close(): void
    formData: Ref<Partial<T>>
    formIsAdd: Ref<boolean>
    formIsLoading: Ref<boolean>
    isShow: Ref<boolean>
    showModel(isAdd: boolean, data?: Partial<T>): void
    submit(): void
}

const log = getLogger('useModalForm')

/**
 * @param {Ref<FormInstance>} formRef
 * @param {Pick<Request<T>, "create" | "update">} request
 * @param {FormInitConfig<T>} init
 * @returns {ModalFormReturn<T>}
 */
export function useModalForm<T>(formRef: Ref<FormInstance>, request: Pick<Request<T>, 'create' | 'update'>, init?: FormInitConfig<T>): ModalFormReturn<T> {
    const isShow: Ref<boolean> = ref(false)
    const formIsLoading: Ref<boolean> = ref(false)
    const formData: Ref<Partial<T>> = ref(init?.formData ?? {}) as any

    const formIsAdd: Ref<boolean> = ref(false)

    return {
        isShow,
        formIsLoading,
        formIsAdd,
        formData,
        showModel(isAdd: boolean, data?: Partial<T>) {
            isShow.value = true
            formIsAdd.value = isAdd
            if (data) {
                formData.value = data
            }
        },
        close() {
            isShow.value = false
        },
        submit() {
            formRef.value.validate()
                .then(ok => {
                    if (!ok) {
                        log.debug('表单验证失败')
                        return
                    }

                    formIsLoading.value = true;

                    (formIsAdd ? request.create : request.update)?.(formData.value)
                        .then(res => init?.submitComplete(res, formIsAdd.value))
                        .catch(err => {
                            log.debug('submit Error: ', err)
                            ElMessage.error(err?.toString())
                        })
                        .finally(() => formIsLoading.value = false)

                })
                .catch((err: Record<string, Array<any>>) => {
                    CollUtil.flatMap(ObjectUtil.toArray(err), i => i.value)
                        .forEach(i => log.warn('验证失败', i))
                })
        },
    }
}
