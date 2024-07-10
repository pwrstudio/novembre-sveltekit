import { writable } from 'svelte/store'
import { NavigationColor } from '$lib/enums'
import type { Writable } from 'svelte/store'

export const menuActive: Writable<boolean> = writable(false)
export const searchActive: Writable<boolean> = writable(false)
export const satelliteSiteActive: Writable<boolean> = writable(false)

export const navigationColor: Writable<NavigationColor> = writable(NavigationColor.White)

export const activeCategory: Writable<string> = writable('')
export const activeQuery: Writable<string> = writable('')
