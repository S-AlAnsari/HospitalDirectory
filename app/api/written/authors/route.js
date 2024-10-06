import WrittenRepo from "../written-repo";

const repo = new WrittenRepo();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let written = await repo.getAuthors();

  return Response.json(written);
}
