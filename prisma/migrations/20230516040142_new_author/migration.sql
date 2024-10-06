/*
  Warnings:

  - Added the required column `email` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "affiliation" INTEGER NOT NULL,
    CONSTRAINT "Author_affiliation_fkey" FOREIGN KEY ("affiliation") REFERENCES "Institutions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Author" ("affiliation", "first_name", "id", "last_name", "paper_id") SELECT "affiliation", "first_name", "id", "last_name", "paper_id" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
