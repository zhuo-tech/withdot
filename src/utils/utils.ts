import  dayjs from 'dayjs'

export function filterTime(time: number): string {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}
