import PapersRepo from "../papers-repo";

const repo = new PapersRepo();
export async function GET(req, { params }) {
    const { id } = params;
    const paper = await repo.getPapers(id);

    return Response.json(paper, { status: 200 });
}


export async function PUT(request) {
    const paper = await request.json();
    const message = await repo.updatePaper(paper);
    return Response.json(message);
}