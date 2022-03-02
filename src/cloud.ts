
import { Cloud } from 'laf-client-sdk'

export const cloud = new Cloud({
  baseUrl: 'https://yourappid.lafyun.com',
  getAccessToken: () => '',
  dbProxyUrl: '/proxy/app'
})
