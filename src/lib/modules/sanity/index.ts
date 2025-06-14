import { createClient } from "@sanity/client"
import { toHTML } from '@portabletext/to-html'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'
import { SANITY_ID } from "$lib/constants";
import { PUBLIC_ENVIRONMENT } from "$env/static/public"

export const client = createClient({
    projectId: SANITY_ID,
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: PUBLIC_ENVIRONMENT ===  "preview" ? false : true, // Don't use the CDN for preview
    apiVersion: '2025-06-01',
})

export const renderBlockText = (blocks: PortableTextBlock[]) => {
    return toHTML(blocks, {
        components: {
            marks: {
                link: ({ children, value }) => {
                    return `<a href="${value.href}" target="_blank" rel="noreferrer">${children}</a>`
                }
            },
            block: {
                normal: ({ children }) => `<p>${children}</p>`,
                blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
            },
            types: {
                imageGroup: ({ value }) => `<p>${value}</p>`,
                slideshow: ({ value }) => `<p>${value}</p>`,
                video: ({ value }) => `<p>${value}</p>`,
                audio: ({ value }) => `<p>${value}</p>`,
                arbitraryEmbed: ({ value }) => `<p>${value}</p>`
            }
        }
    })
}

export const toPlainText = (blocks: PortableTextBlock[]) => {
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            return block.children.map(child => child.text).join('')
        })
        .join('\n\n')
}

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

export const loadData = async (query: string, params: any) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error("404"));
        }
        return res
    } catch (err) {
        return Promise.reject(new Error("404"));
    }
}
