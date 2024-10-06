-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperId" INTEGER NOT NULL,
    "evaluation" INTEGER NOT NULL,
    "contribution" INTEGER NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_paperId_key" ON "Review"("paperId");
