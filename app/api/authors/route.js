import AuthorsRepo from "./authors-repo"
const repo = new AuthorsRepo()
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
        let authors = await repo.getAuthors(email)
        return Response.json(authors)
    }
    catch (error) {
        console.error(error)
        return Response.error(error)
    }
}
export async function POST(request) {
    const author = await request.json();
    const newAuthor = await repo.addAuthor(author);
    return Response.json(newAuthor);
}
