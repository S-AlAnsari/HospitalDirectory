import fs from 'fs-extra'
import path from 'path'

export default class InstRepo {
    constructor() {
        this.path = path.join(process.cwd(), '/data/institutions.json')
        console.log(this.path);
    }
    async getInstitutions() {
        const insts = await fs.readJSON(this.path)
        return insts;
    }
}