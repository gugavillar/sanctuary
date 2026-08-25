-- CreateTable
CREATE TABLE "Document_Types" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Document_Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document_Categories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Document_Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_Types_type_key" ON "Document_Types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Document_Categories_category_key" ON "Document_Categories"("category");
