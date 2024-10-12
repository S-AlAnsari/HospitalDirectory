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
  // const { searchParams } = new URL(request.url);

  // // Extract query parameters
  // const departmentId = searchParams.get('departmentId');
  // const userId = searchParams.get('userId');
  // const scheduleId = searchParams.get('scheduleId');

  // try {
  //     // Perform search based on provided parameters
  //     const scheduleAssignments = await prisma.scheduleAssignment.findMany({
  //         where: {
  //             userId: userId ? Number(userId) : undefined,
  //             departmentId: departmentId ? Number(departmentId) : undefined,
  //             scheduleId: scheduleId ? Number(scheduleId) : undefined
  //         }
  //     });

  //     // Return the response as JSON
  //     return new Response(JSON.stringify(scheduleAssignments), {
  //         status: 200,
  //         headers: { 'Content-Type': 'application/json' }
  //     });
  // } catch (error) {
  //     return new Response(JSON.stringify({ error: error.message }), {
  //         status: 500,
  //         headers: { 'Content-Type': 'application/json' }
  //     });
  // }
  
}

export async function POST(request) {
  const schedule = await request.json();
  const newSchedule = await repo.createAssignment(schedule);
  return Response.json(newSchedule);
}
export async function PUT(request) {
  const schedule = await request.json();
  const newSchedule = await repo.updateAssignment(schedule);
  return Response.json(newSchedule);
}