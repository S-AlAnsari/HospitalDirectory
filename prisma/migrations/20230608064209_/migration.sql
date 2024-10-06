/*
  Warnings:

  - You are about to drop the column `session_id` on the `Paper` table. All the data in the column will be lost.
  - Added the required column `paperId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenter" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Paper_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "id", "presenter", "reviewer_id", "status", "title", "user_id") SELECT "abstract", "id", "presenter", "reviewer_id", "status", "title", "user_id" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateField" DATETIME NOT NULL,
    "locationId" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "paperId" INTEGER NOT NULL,
    "scheduleId" INTEGER,
    CONSTRAINT "Session_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_dateField_fkey" FOREIGN KEY ("dateField") REFERENCES "Date" ("date") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("dateField", "endTime", "id", "locationId", "scheduleId", "startTime", "title") SELECT "dateField", "endTime", "id", "locationId", "scheduleId", "startTime", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
