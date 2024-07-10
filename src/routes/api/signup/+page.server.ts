import { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } from '$env/static/private';

const MJ_BASE_URL = 'https://api.mailjet.com/v3/REST';
const headers = {
    'Authorization': 'Basic ' + btoa(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`),
    'Content-Type': 'application/json',
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');

        try {
            // Create contact
            const createContactResponse = await fetch(`${MJ_BASE_URL}/contact`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ "Email": email }),
            });

            if (!createContactResponse.ok) {
                throw new Error('Error creating contact');
            }

            // Add to list
            const addToListResponse = await fetch(`${MJ_BASE_URL}/listrecipient`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    "ContactAlt": email,
                    "ListID": "2363091",
                }),
            });

            if (!addToListResponse.ok) {
                throw new Error('Error adding contact to list');
            }

            const addToListResult = await addToListResponse.json();

            return {
                statusCode: 200,
                body: JSON.stringify({ result: addToListResult }),
            };

        } catch (err) {
            return {
                statusCode: 400,
                body: JSON.stringify({ result: err.message }),
            };
        }
    }
};