

import Image from 'next/image'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages, fallbackLng } from '@/i18n/settings'
import { useTranslation } from '@/i18n'
import { Metadata, ResolvingMetadata } from 'next'
import data from '@data'



export const dynamic = 'force-static'
export const dynamicParams = false;



export async function generateMetadata(
  { params }: any,
): Promise<Metadata> {  
  const metaData = data.getData(params.lng).metadata; 
  return metaData.root;
}

const  Page=  async({ params: { lng } }: {params:{lng:string},}) =>{
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      THIS~PAGE
      </div>
    </main>
  )
}

export default Page