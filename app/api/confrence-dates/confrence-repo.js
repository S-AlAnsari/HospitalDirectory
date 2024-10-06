import fs from 'fs-extra'
import path from 'path'

export default class DatesRepo {
    constructor() {
        this.path = path.join(process.cwd(), '/data/confrence-dates.json')
        console.log(this.path);
    }
    async getDates() {
        const dates = await fs.readJSON(this.path)
        return dates;
    }
}