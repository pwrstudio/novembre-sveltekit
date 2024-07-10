export const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
}

export const getCurrentTimeInUTC = () => {
    return new Date().toISOString();
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

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