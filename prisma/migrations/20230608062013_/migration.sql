/*
  Warnings:

  - You are about to drop the `_PaperToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_PaperToSession_B_index";

-- DropIndex
DROP INDEX "_PaperToSession_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PaperToSession";
PRAGMA foreign_keys=on;

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
    "session_id" INTEGER,
    CONSTRAINT "Paper_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "id", "presenter", "reviewer_id", "status", "title", "user_id") SELECT "abstract", "id", "presenter", "reviewer_id", "status", "title", "user_id" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
