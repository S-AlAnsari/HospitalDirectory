import SessionsRepo from "../sessions-repo";
const repo = new SessionsRepo();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let schedules = await repo.getCount();

  return Response.json(schedules);
}

// export async function PUT(request) {
//   const paper = await request.json();
//   const message = await repo.addPaper(paper);
//   return Response.json(message);
// }
