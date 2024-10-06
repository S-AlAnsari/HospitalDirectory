import InstRepo from "./inst-repo"
const repo = new InstRepo()
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const insts = await repo.getInstitutions()
    return Response.json(insts)
}
