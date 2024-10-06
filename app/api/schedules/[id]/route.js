import SchedulesRepo from "../schedule-repo";
const repo = new SchedulesRepo();
export async function GET(req, { params }) {
  const { id } = params;
  const paper = await repo.getScheduleById(id);

  return Response.json(paper, { status: 200 });
}

export async function PUT(request) {
  const paper = await request.json();
  const message = await repo.updateSchedule(paper);
  return Response.json(message);
}
