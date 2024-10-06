import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default class LocationsRepo {
  constructor() {
    // this.path = path.join(process.cwd(), "/data/locations.json");
    // console.log(this.path);
  }
  async getLocations() {
    const locations = await prisma.locations.findMany();
    return locations;
  }

  async getLocationById(id) {
    const location = await prisma.locations.findUnique({
      where: {
        id: +id,
      },
    });
    return location;
  }
}
