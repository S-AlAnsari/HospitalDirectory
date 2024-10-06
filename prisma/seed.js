const { PrismaClient } = require("@prisma/client");
const users = require("../data/users.json");
const hospitals = require("../data/hospitals.json");
const departments = require("../data/departments.json");
const assignments = require("../data/assignments.json");
const schedules = require("../data/schedule.json");
const prisma = new PrismaClient();
const loadUsers = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.schedule.deleteMany();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.user.deleteMany();
    console.log("Users deleted");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.department.deleteMany();
    console.log("Departments deleted");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.hospital.deleteMany();
    console.log("Hospitals deleted");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.scheduleAssignment.deleteMany();
    console.log("Assignments deleted");
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );
    console.log("Users created");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    hospitals.forEach(async (hospital) => {
      await prisma.hospital.create({
        data: hospital,
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    departments.forEach(async (department) => {
      await prisma.department.create({
        data: department,
      });
    });
   

    await new Promise((resolve) => setTimeout(resolve, 1000));
    schedules.forEach(async (schedule) => {
      await prisma.schedule.create({
        data: schedule,
      });
    });
    console.log("Schedules created");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    assignments.forEach(async (assignment) => {
      await prisma.scheduleAssignment.create({
        data: assignment,
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

loadUsers();
