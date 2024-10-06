import DatesRepo from "../dates-repo";
const repo = new DatesRepo();
export async function GET(req, { params }) {
  const { id } = params;
  const paper = await repo.getDateById(id);

  return Response.json(paper, { status: 200 });
}
