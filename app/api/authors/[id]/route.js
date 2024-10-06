import AuthorsRepo from "../authors-repo";

const repo = new AuthorsRepo();
export async function GET(req, { params }) {
    const { id } = params;
    const author = await repo.getAuthor(id);

    return Response.json(author, { status: 200 });
}