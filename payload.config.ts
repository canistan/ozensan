import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        read: () => true,
      },
      fields: [],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'brands',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        }
      ],
    },
    {
      slug: 'products',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'brand',
          type: 'relationship',
          relationTo: 'brands',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'specifications',
          type: 'array',
          fields: [
            {
              name: 'key',
              type: 'text',
            },
            {
              name: 'value',
              type: 'text',
            }
          ]
        }
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: 'media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      slug: 'contact-messages',
      labels: {
        singular: 'İletişim Mesajı',
        plural: 'İletişim Mesajları',
      },
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'phone', 'subject', 'createdAt'],
      },
      access: {
        create: () => true, // Allow anyone to submit a contact message
        read: ({ req: { user } }) => Boolean(user), // Only admins can read
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
      },
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Ad Soyad' },
        { name: 'email', type: 'email', required: true, label: 'E-Posta' },
        { name: 'phone', type: 'text', required: true, label: 'Telefon' },
        { name: 'subject', type: 'text', required: true, label: 'Konu' },
        { name: 'message', type: 'textarea', required: true, label: 'Mesaj' },
      ],
    },
    {
      slug: 'newsletter-subscribers',
      labels: {
        singular: 'Bülten Abonesi',
        plural: 'Bülten Aboneleri',
      },
      admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'createdAt'],
      },
      access: {
        create: () => true, // Allow anyone to subscribe
        read: ({ req: { user } }) => Boolean(user), // Only admins can read
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
      },
      fields: [
        { name: 'email', type: 'email', required: true, label: 'E-Posta' },
      ],
    }
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
})
