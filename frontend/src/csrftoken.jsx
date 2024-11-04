// Function to retrieve the CSRF token from cookies
export function getCSRFToken() {
    const name = 'csrftoken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name))
      ?.split('=')[1];
    return cookieValue || '';
}