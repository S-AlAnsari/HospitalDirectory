/*
  Warnings:

  - You are about to alter the column `presenter` on the `Paper` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `reviewer_id` to the `Paper` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenter" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    CONSTRAINT "Paper_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "id", "presenter", "title", "user_id") SELECT "abstract", "id", "presenter", "title", "user_id" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
