import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'

export const metadata = {
  title: 'Özensan Admin Panel',
  description: 'Payload CMS',
}

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => {
  return <RootLayout config={configPromise} importMap={importMap} serverFunction={handleServerFunctions}>{children}</RootLayout>
}

export default Layout
