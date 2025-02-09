/**
 * Fetch data from a URL with CORS handling.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves with the fetched data.
 */
export function fetchWithCors(url) {
    return fetch(url, { mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json(); // Assuming the response is JSON
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}
