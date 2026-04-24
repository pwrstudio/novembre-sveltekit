import type { MergedProduct } from "$lib/types"

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "")
}

export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === "string")
    return value.length === 0
  if (value instanceof Map || value instanceof Set) return value.size === 0
  if (typeof value === "object")
    return Object.keys(value as object).length === 0
  return false
}

export const kebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

export const sortBy = <T>(
  items: T[] | null | undefined,
  iteratee?: (item: T) => unknown,
): T[] => {
  if (!items) return []
  const key = iteratee ?? ((x: T) => x)
  return [...items].sort((a, b) => {
    const ka = key(a) as never
    const kb = key(b) as never
    if (ka < kb) return -1
    if (ka > kb) return 1
    return 0
  })
}

export const truncate = (
  str: string,
  {
    length = 30,
    separator,
    omission = "...",
  }: { length?: number; separator?: string | RegExp; omission?: string } = {},
): string => {
  if (str.length <= length) return str
  const end = length - omission.length
  if (end < 1) return omission.slice(0, length)

  let truncated = str.slice(0, end)
  if (separator) {
    if (separator instanceof RegExp) {
      // Find the last match ending at or before `end`
      const re = new RegExp(
        separator.source,
        separator.flags.includes("g") ? separator.flags : separator.flags + "g",
      )
      let match: RegExpExecArray | null
      let lastIndex = -1
      while ((match = re.exec(truncated)) !== null) {
        lastIndex = match.index
        if (match.index === re.lastIndex) re.lastIndex++
      }
      if (lastIndex > -1) truncated = truncated.slice(0, lastIndex)
    } else {
      const idx = truncated.lastIndexOf(separator)
      if (idx > -1) truncated = truncated.slice(0, idx)
    }
  }
  return truncated + omission
}

export const getCurrentTimeInUTC = () => {
  return new Date().toISOString()
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}/${month}/${day}`
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export function setCookie(name: string, value: string, hours: number): void {
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}
