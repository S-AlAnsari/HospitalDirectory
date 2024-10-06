import UsersRepo from "./users-repo"
const repo = new UsersRepo()
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");
  let assignments;
  if(departmentId){
    assignments = await repo.getAssignmentByDepartmentId(departmentId);
  }else{
    assignments = await repo.getAssignments();
  }
  return Response.json(assignments);
}
