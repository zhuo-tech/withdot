import { CoreDot } from '@/model/entity/CoreDot'

interface DotFilter<T, R> {

    filter(item: T, reference: R): boolean

}

type ReferenceValue = {
    currentPlaybackTime: number
}

/**
 * CoreDotController
 * @author LL
 * @date 2022-04-20 下午 3:52
 **/
export class CoreDotController implements DotFilter<CoreDot, ReferenceValue> {

    public filter(item: CoreDot, reference: ReferenceValue): boolean {
        if (item === null || item === undefined) {
            return false
        }
        const {start = 0, end = 0} = item
        const {currentPlaybackTime: ct} = reference

        return ct >= start && ct <= end
    }

}
