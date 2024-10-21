import UsersRepo from "./users-repo"
const repo = new UsersRepo()
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
        const role = searchParams.get('role')
        let users = await repo.getUsers(email, role)
        return Response.json(users)
    }
    catch (error) {
        console.error(error)
        return Response.error(error)
    }
}
export async function PUT(request) {
    const user = await request.json();
    const newUser = await repo.updateUser(user);
    return Response.json(newUser);
  }