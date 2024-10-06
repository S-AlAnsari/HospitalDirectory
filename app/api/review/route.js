import PapersRepo from "./review-repo";
const repo = new PapersRepo();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const paperId = searchParams.get("paperId");
  let reviews = await repo.getReview(paperId);

  return Response.json(reviews);
}

export async function POST(request) {
  const review = await request.json();
  const newReview = await repo.addReview(review);
  return Response.json(newReview);
}

export async function PUT(request) {
  const review = await request.json();
  const newReview = await repo.updateReview(review);
  return Response.json(newReview);
}


// export async function PUT(request) {
//   const paper = await request.json();
//   const message = await repo.addPaper(paper);
//   return Response.json(message);
// }
