-- CreateTable
CREATE TABLE "watchList" (
    "id" SERIAL NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "watchList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "watchList_id_key" ON "watchList"("id");

-- AddForeignKey
ALTER TABLE "watchList" ADD CONSTRAINT "watchList_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "userPortfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
