import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export const menuActive: Writable<boolean> = writable(false)
export const searchActive: Writable<boolean> = writable(false)
export const satelliteSiteActive: Writable<boolean> = writable(false)
