import UsersRepo from "./users-repo"
const repo = new UsersRepo()
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hospitalId = searchParams.get("hospitalId");
  let hospitals;
  if(hospitalId){
    hospitals = await repo.getHospitalById(hospitalId);
  }else{
    hospitals = await repo.getHospitals();
  }
  return Response.json(hospitals);
}
