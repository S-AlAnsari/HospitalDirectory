import SchedulesRepo from "./schedule-repo";
const repo = new SchedulesRepo();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let schedules = await repo.getSchedule();

  return Response.json(schedules);
}

export async function POST(request) {
  const schedule = await request.json();
  const newSchedule = await repo.addSchedule(schedule);
  return Response.json(newSchedule);
}

export async function PUT(request) {
  const schedule = await request.json();
  const newSchedule = await repo.updateSchedule(schedule);
  return Response.json(newSchedule);
}


// export async function PUT(request) {
//   const paper = await request.json();
//   const message = await repo.addPaper(paper);
//   return Response.json(message);
// }
