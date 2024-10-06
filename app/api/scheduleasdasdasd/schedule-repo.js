import fs from 'fs-extra'
import path from 'path'

export default class SchedulesRepo {
    constructor() {
        this.path = path.join(process.cwd(), '/data/schedule.json')
        console.log(this.path);
    }

    async getSchedules() {
        const Schedules = await fs.readJSON(this.path)
        return Schedules;
    }

    async addSchedule(schedule) {
        const schedules = await this.getSchedules()
        schedules.push(schedule)
        await fs.writeJSON(this.path, schedules)
        return schedule;
    }
}
