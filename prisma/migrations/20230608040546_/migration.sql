-- CreateTable
CREATE TABLE "Locations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateField" DATETIME NOT NULL,
    "locationId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    CONSTRAINT "Session_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_dateField_fkey" FOREIGN KEY ("dateField") REFERENCES "Date" ("date") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Date" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaperToSession" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaperToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Date_date_key" ON "Date"("date");

-- CreateIndex
CREATE UNIQUE INDEX "_PaperToSession_AB_unique" ON "_PaperToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperToSession_B_index" ON "_PaperToSession"("B");
