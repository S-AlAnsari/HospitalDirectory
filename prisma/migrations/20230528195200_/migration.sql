/*
  Warnings:

  - You are about to drop the column `paper_id` on the `Author` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "affiliation" INTEGER NOT NULL,
    CONSTRAINT "Author_affiliation_fkey" FOREIGN KEY ("affiliation") REFERENCES "Institutions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Author" ("affiliation", "email", "first_name", "id", "last_name") SELECT "affiliation", "email", "first_name", "id", "last_name" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
