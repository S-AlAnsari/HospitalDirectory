import UsersRepo from "../users-repo";

const repo = new UsersRepo();
export async function GET(req, { params }) {
    const { id } = params;
    const user = await repo.getUser(id);

    return Response.json(user, { status: 200 });
}