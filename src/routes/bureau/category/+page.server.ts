import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
    redirect(301, "/bureau");
}