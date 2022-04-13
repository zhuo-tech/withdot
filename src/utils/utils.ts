import  dayjs from 'dayjs'

export function filterTime(time: any) {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}
