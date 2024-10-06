import LocationsRepo from "../locations";
const repo = new LocationsRepo();
export async function GET(req, { params }) {
  const { id } = params;
  const paper = await repo.getLocationById(id);

  return Response.json(paper, { status: 200 });
}
