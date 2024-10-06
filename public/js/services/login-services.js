const BASE_URL = "/api/users";

export async function getUsers(email) {
    const response = await fetch(`${BASE_URL}?email=${email}`);
    return await response.json();
}

export async function getUser(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
}

