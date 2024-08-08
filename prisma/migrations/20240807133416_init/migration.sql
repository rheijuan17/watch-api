/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Watch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Watch_code_key" ON "Watch"("code");
