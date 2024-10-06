import LocationsRepo from "./locations"
const repo = new LocationsRepo()
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const users = await repo.getLocations()
    return Response.json(users)
}