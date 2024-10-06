import DatesRepo from "./confrence-repo"
const repo = new DatesRepo()
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const users = await repo.getDates()
    return Response.json(users)
}