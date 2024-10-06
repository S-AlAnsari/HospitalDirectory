import PapersRepo from "./papers-repo";
const repo = new PapersRepo();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const userId = searchParams.get("userId");
  let papers;

  if (status) {
    papers = await repo.getPapersByStatus(status);
  } else if (userId) {
    papers = await repo.getPapersByUserId(userId);
  } else {
    papers = await repo.getPapers();
  }

  return Response.json(papers);
}

export async function POST(request) {
  const paper = await request.json();
  const newPaper = await repo.addPaper(paper);
  return Response.json(newPaper);
}

export async function PUT(request) {
  const paper = await request.json();
  const message = await repo.updatePaper(paper);
  return Response.json(message);
}
