-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlatAWS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detailName" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "battery" INTEGER NOT NULL,
    "signal" INTEGER NOT NULL,
    "sensor" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "AlatAWS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlatAWL" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detailName" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "battery" INTEGER NOT NULL,
    "signal" INTEGER NOT NULL,
    "data" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "AlatAWL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PT" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kebun" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Kebun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlatDashboard" (
    "id" TEXT NOT NULL,
    "pt" TEXT NOT NULL,
    "kebun" TEXT NOT NULL,
    "rusak" INTEGER NOT NULL,
    "idle" INTEGER NOT NULL,
    "active" INTEGER NOT NULL,
    "alert" INTEGER NOT NULL,

    CONSTRAINT "AlatDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" SERIAL NOT NULL,
    "tanggal" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "suhuRataRata" DOUBLE PRECISION NOT NULL,
    "ch" DOUBLE PRECISION NOT NULL,
    "kelembabanRelatif" DOUBLE PRECISION NOT NULL,
    "tekananUdara" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "windDirec" DOUBLE PRECISION NOT NULL,
    "suhuMinimal" DOUBLE PRECISION NOT NULL,
    "suhuMaksimal" DOUBLE PRECISION NOT NULL,
    "evapotranspirasi" DOUBLE PRECISION NOT NULL,
    "radiasiSolarPanel" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TMASData" (
    "id" SERIAL NOT NULL,
    "tanggal" TEXT NOT NULL,
    "ketinggian" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TMASData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TMATData" (
    "id" SERIAL NOT NULL,
    "tanggal" TEXT NOT NULL,
    "ketinggian" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TMATData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
