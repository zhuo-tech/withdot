/**
 * 展示类型
 */
export enum DotDisplayType {
    BUTTON = 'button',
    EXPANDED = 'expanded',
    HIDE = 'hide'
}

export const DotDisplayTypeShow: Record<string, DotDisplayType> = {
    '收起': DotDisplayType.BUTTON,
    '展开': DotDisplayType.EXPANDED,
    '隐藏': DotDisplayType.HIDE,
}
