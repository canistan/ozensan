import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

export const metadata = {
  title: 'Özensan Admin Panel',
  description: 'Payload CMS',
}

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => {
  return <RootLayout config={configPromise}>{children}</RootLayout>
}

export default Layout
