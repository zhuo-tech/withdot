
import { Cloud } from 'laf-client-sdk'
import { getToken } from './api/tokenn'

export const cloud = new Cloud({
  baseUrl: 'https://7dd2f8e8-6102-492c-a522-b5a7db2ab00a.lafyun.com',
  getAccessToken: () => getToken(),
  dbProxyUrl: '/proxy/app'
})
