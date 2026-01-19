-- CreateTable
CREATE TABLE "Stocks" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stocks_symbol_key" ON "Stocks"("symbol");
