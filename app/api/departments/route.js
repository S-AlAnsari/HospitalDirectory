import UsersRepo from "./users-repo"
const repo = new UsersRepo()
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hospitalId = searchParams.get("hospitalId");
  let departments;
  if(hospitalId){
    departments = await repo.getHospitalById(hospitalId);
  }else{
    departments = await repo.getHospitals();
  }
  return Response.json(departments);
}
