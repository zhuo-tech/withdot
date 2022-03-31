import { Cloud } from 'laf-client-sdk'
import { getToken } from './api/token'

export const LAF_BLASE_URL = 'https://7dd2f8e8-6102-492c-a522-b5a7db2ab00a.lafyun.com'

export const cloud = new Cloud({
    baseUrl: LAF_BLASE_URL,
    getAccessToken: () => getToken(),
    dbProxyUrl: '/proxy/app',
})
