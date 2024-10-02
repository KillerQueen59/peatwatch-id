import dayjs from "dayjs";

const { PrismaClient } = require("@prisma/client");
const {
  dummyAwl,
  dummyAws,
  dummyDevice,
  dummiesDashboard,
  dummyKebun,
  dummyPT,
} = require("../dummy/data"); // Adjust the path as needed
import dummyData2 from "../dummy/dummy_data.json";
import dummyTmas from "../dummy/tmas_dummy.json";
import dummyTmat from "../dummy/tmat_dummy.json";

const prisma = new PrismaClient();

const formatDate = (timestamp: number) => {
  return dayjs(timestamp).format("DD/MM/YYYY HH:mm:ss.SSS");
};

async function main() {
  for (const awl of dummyAwl) {
    await prisma.alatAWL.upsert({
      where: { id: awl.id },
      update: {
        name: awl.name,
        detailName: awl.detailName,
        startDate: dayjs(awl.startDate),
        battery: awl.battery,
        signal: awl.signal,
        data: awl.data,
        status: awl.status,
        note: awl.note,
      },
      create: {
        id: awl.id,
        name: awl.name,
        detailName: awl.detailName,
        startDate: dayjs(awl.startDate),
        battery: awl.battery,
        signal: awl.signal,
        data: awl.data,
        status: awl.status,
        note: awl.note,
      },
    });
  }

  for (const aws of dummyAws) {
    await prisma.alatAWS.upsert({
      where: { id: aws.id },
      update: {
        name: aws.name,
        detailName: aws.detailName,
        startDate: dayjs(aws.startDate),
        battery: aws.battery,
        signal: aws.signal,
        sensor: aws.sensor,
        status: aws.status,
      },
      create: {
        id: aws.id,
        name: aws.name,
        detailName: aws.detailName,
        startDate: dayjs(aws.startDate),
        battery: aws.battery,
        signal: aws.signal,
        sensor: aws.sensor,
        status: aws.status,
      },
    });
  }

  for (const device of dummyDevice) {
    await prisma.device.create({
      data: {
        name: device.value,
      },
    });
  }

  for (const kebun of dummyKebun) {
    await prisma.kebun.create({
      data: {
        name: kebun.value,
      },
    });
  }

  for (const pt of dummyPT) {
    await prisma.pT.create({
      data: {
        name: pt.value,
      },
    });
  }

  for (const dashboard of dummiesDashboard) {
    await prisma.alatDashboard.create({
      data: {
        pt: dashboard.pt,
        kebun: dashboard.kebun,
        rusak: dashboard.rusak,
        idle: dashboard.idle,
        active: dashboard.active,
        alert: dashboard.alert,
      },
    });
  }

  const dummyDatas = dummyData2.map((data) => {
    return {
      ...data,
      Tanggal: formatDate(data.Tanggal),
    };
  });

  for (const data of dummyDatas) {
    await prisma.weatherData.create({
      data: {
        tanggal: data.Tanggal,
        year: data.YEAR,
        suhuRataRata: data["Suhu Rata-rata"],
        ch: data.CH,
        kelembabanRelatif: data["kelembaban Relatif"],
        tekananUdara: data["Tekanan Udara"],
        windSpeed: data["Wind Speed"],
        windDirec: data["Wind Direc"],
        suhuMinimal: data["Suhu Minimal"],
        suhuMaksimal: data["Suhu Maksimal"],
        evapotranspirasi: data.Evapotranspirasi,
        radiasiSolarPanel: data["Radiasi Solar Panel"],
      },
    });
  }

  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "Some Admin",
      password: "test123",
      role: "admin",
    },
  });

  const dummyTmasData = dummyTmas.map((data) => {
    return {
      ...data,
      Tanggal: dayjs(data.Tanggal).format("DD/MM/YYYY HH:mm:ss.SSS"),
    };
  });

  for (const data of dummyTmasData) {
    console.log("Processing data TMAS:", data);
    await prisma.tMASData.create({
      data: {
        tanggal: data.Tanggal,
        ketinggian: data["Ketinggian (cm)"],
      },
    });
  }

  const dummyTmatData = dummyTmat.map((data) => {
    console.log("Processing data TMAT:", data);
    return {
      ...data,
      Tanggal: dayjs(data.Tanggal).format("DD/MM/YYYY HH:mm:ss.SSS"),
    };
  });

  for (const data of dummyTmatData) {
    await prisma.tMATData.create({
      data: {
        tanggal: data.Tanggal,
        ketinggian: data["Ketinggian (cm)"],
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding finished.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
