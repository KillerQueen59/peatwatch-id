import BarChart from "@/components/Chart/BarChart";
import LineChart from "@/components/Chart/LineChart/LineChart";
import LineChartFiller from "@/components/Chart/LineChart/LineChartFiller";
import TableChart from "@/components/Chart/TableChart";
import Table from "@/components/Table/Table";
import { getWindDirection } from "@/shared/helper";
import dayjs from "dayjs";
import { SetStateAction } from "react";

export type Data = {
  "Suhu Rata-rata": number;
  CH: number;
  "kelembaban Relatif": number;
  "Tekanan Udara": number;
  "Wind Speed": number;
  "Wind Direc": number;
  "Suhu Minimal": number;
  "Suhu Maksimal": number;
  Evapotranspirasi: number;
  "Radiasi Solar Panel": number;
  Tanggal: string;
};

export const dataType = [
  "evaportranpiration",
  "humidity",
  "rainfall",
  "rainRate",
  "solarRadiation",
  "temperature",
  "windSpeed",
  "windDirection",
];

export const RenderData = ({
  tipe,
  label,
  data,
  selectedDate,
  pt,
  kebun,
  device,
}: {
  tipe: string;
  label: string[];
  data: Data[];
  selectedDate: Date;
  pt: string;
  kebun: string;
  device: string;
}) => {
  switch (tipe) {
    case "evaportranpiration":
      return (
        <LineChartFiller
          label={label}
          upperTitle="Laporan AWS"
          title="Evapotranspirasi"
          data={[
            data.map((data) => {
              return data.Evapotranspirasi;
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Evapotranspirasi (mm)"
          dataSatuan="mm"
          dataType="Evapotranspirasi"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="evaportranpiration"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );

    case "humidity":
      return (
        <LineChart
          label={label}
          upperTitle="Laporan AWS"
          title="Kelembaban"
          data={[
            data.map((data) => {
              return data["kelembaban Relatif"];
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Humidity (%)"
          dataSatuan="%"
          dataType="Humidity"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="humidity"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
    case "rainfall":
      return (
        <BarChart
          label={label}
          upperTitle="Laporan AWS"
          title="Curah Hujan"
          data={[
            data.map((data) => {
              return data.CH;
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Rainfall (mm)"
          dataSatuan="mm"
          dataType="Rainfall"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="rainfall"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
    case "rainRate":
      return (
        <BarChart
          label={label}
          upperTitle="Laporan AWS"
          title="Intensitas Hujan"
          data={[
            data.map((data) => {
              return data.CH;
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Rain Rate (mm/jam)"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="rainRate"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
    case "solarRadiation":
      return (
        <LineChartFiller
          label={label}
          upperTitle="Laporan AWS"
          title="Radiasi Solar Panel"
          data={[
            data.map((data) => {
              return data["Radiasi Solar Panel"];
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Solar Radiation (W/m2)"
          dataSatuan="W/m2"
          dataType="Solar Radiation"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="solarRadiation"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
    case "temperature":
      return (
        <LineChart
          label={label}
          upperTitle="Laporan AWS"
          title="Suhu"
          data={[
            data.map((data) => {
              return data["Suhu Rata-rata"];
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Temperature (°C)"
          dataSatuan="°C"
          dataType="Temperature"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="temperature"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
    case "uv":
      return (
        <LineChart
          label={label}
          upperTitle="Laporan AWS"
          title="Ultra Violet Index"
          data={[
            data.map((data) => {
              return data.CH;
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Index"
          dataSatuan="index"
          dataType="Ultra Violet"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="uv"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
    case "windSpeed":
      return (
        <BarChart
          label={label}
          upperTitle="Laporan AWS"
          title="Kecepatan Angin"
          data={[
            data.map((data) => {
              return data["Wind Speed"];
            }),
          ]}
          xAxisTitle="Jam"
          yAxisTitle="Wind Speed (km/h)"
          dataSatuan="km/h"
          dataType="Wind Speed"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="windSpeed"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );

    case "windDirection":
      return (
        <TableChart
          upperTitle="Laporan AWS"
          data={data.map((data) => {
            return {
              date: data.Tanggal.split(" ")[0],
              time: data.Tanggal.split(" ")[1],
              direction: getWindDirection(data["Wind Direc"]),
              data: data["Wind Direc"],
            };
          })}
          columns={[
            {
              accessorKey: "date",
              header: () => (
                <div className="w-full text-left text-xs text-gray-80">
                  Tanggal
                </div>
              ),
              cell: (info: any) => <div>{info.row.original.date ?? "-"}</div>,

              minSize: Math.round(
                (global?.window && window.innerHeight - 55) * 0.4
              ),
            },
            {
              accessorKey: "time",
              header: () => (
                <div className="w-full text-left text-xs text-gray-80">
                  Waktu
                </div>
              ),
              cell: (info: any) => <div>{info.row.original.time ?? "-"}</div>,

              minSize: Math.round(
                (global?.window && window.innerHeight - 55) * 0.4
              ),
            },
            {
              accessorKey: "direction",
              header: () => (
                <div className="w-full text-left text-xs text-gray-80">
                  Arah
                </div>
              ),
              cell: (info: any) => (
                <div>{info.row.original.direction ?? "-"}</div>
              ),

              minSize: Math.round(
                (global?.window && window.innerHeight - 55) * 0.4
              ),
            },
            {
              accessorKey: "data",
              header: () => (
                <div className="w-full text-left text-xs text-gray-80">
                  Data
                </div>
              ),
              cell: (info: any) => <div>{info.row.original.data ?? "-"}</div>,

              minSize: Math.round(
                (global?.window && window.innerHeight - 55) * 0.4
              ),
            },
          ]}
          title="Arah Angin"
          selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
          id="windDirection"
          pt={pt}
          kebun={kebun}
          device={device}
        />
      );
  }
  return (
    <div className="m-4 align-center justify-center">no data selected</div>
  );
};

export default RenderData;
