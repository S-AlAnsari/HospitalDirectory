import SessionsRepo from "./sessions-repo";
const repo = new SessionsRepo();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let schedules = await repo.getSessions();

  return Response.json(schedules);
}

export async function POST(request) {
  const session = await request.json();
  const newSession = await repo.addSession(session);
  return Response.json(newSession);
}

export async function PUT(request) {
  const session = await request.json();
  const newSession = await repo.updateSession(session);
  return Response.json(newSession);
}

// export async function PUT(request) {
//   const paper = await request.json();
//   const message = await repo.addPaper(paper);
//   return Response.json(message);
// }
