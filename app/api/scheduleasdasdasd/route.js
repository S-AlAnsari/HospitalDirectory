import SchedulesRepo from "./schedule-repo"
const repo = new SchedulesRepo()

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const Schedules = await repo.getSchedules()
    return Response.json(Schedules)
}

export async function POST(request) {
    const schedule = await request.json();
    const newSchedule = await repo.addSchedule(schedule);
    return Response.json(newSchedule);
}