// replace this with your own url that reads data from the data/recipes.json file
const BASE_URL = '/api/papers'

export async function getPapers() {
    const data = await fetch(BASE_URL)
    return await data.json()
}

export async function addPaper(paper) {
    const papers = await getPapers();
    paper.id = Math.max(...papers.map(r => r.id)) + 1
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper)
    })
    return await response.json()
}
export async function updateRecipe(id, updatedRecipe) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe)
    })
    return await response.json()
}

export async function deleteRecipe(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    return await response.json()
}