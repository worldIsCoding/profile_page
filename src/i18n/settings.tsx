import { InitOptions } from "i18next"


export const fallbackLng = 'en'
export const languages = [fallbackLng, 'zh-Hant']
export const defaultNS = 'common'

export const getOptions: (lng:any, ns:any)=>InitOptions =(lng:any= fallbackLng, ns:any = defaultNS) =>{
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    nsSeparator: "."
    // backend: {
    //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
    // }
  }
}
