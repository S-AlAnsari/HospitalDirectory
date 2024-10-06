import WrittenRepo from "./written-repo"

const repo = new WrittenRepo()
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const paperId = searchParams.get("paperId");
    let written = await repo.getWritten(paperId);

    return Response.json(written);
}

export async function POST(request) {
    const written = await request.json();
    const newWritten = await repo.addWritten(written);
    return Response.json(newWritten);
}