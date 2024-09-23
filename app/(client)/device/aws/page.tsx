"use client";

import LineChart from "@/components/Chart/LineChart/LineChart";
import CustomSelect from "@/components/CustomSelect";
import CustomSelectField from "@/components/CustomSelectField";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import dummyData2 from "@/dummy/dummy_data.json";
import dayjs from "dayjs";
import RenderData from "./component/RenderData";
import InputDate from "@/components/InputDate/InputDate";
import { dummyDevice, dummyKebun, dummyPT } from "@/dummy/data";

const formatDate = (timestamp: number) => {
  return dayjs(timestamp).format("DD/MM/YYYY HH:mm:ss.SSS");
};

export default function AWS() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dummyData = dummyData2
    .map((data) => {
      return {
        ...data,
        Tanggal: formatDate(data.Tanggal),
      };
    })
    .filter((data) => {
      return (
        data.Tanggal.split(" ").length > 0 &&
        data.Tanggal.split(" ")[0] === dayjs(selectedDate).format("DD/MM/YYYY")
      );
    });

  const dummyLabels = dummyData.map((data) => {
    return data.Tanggal.split(" ")[1].slice(0, 5);
  });

  const [tipe, setTipe] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const [pt, setPt] = useState("");
  const [kebun, setKebun] = useState("");
  const [device, setDevice] = useState("");

  return (
    <div>
      <div className="w-full p-8">
        <div className="rounded-2xl	w-full border border-gray-30 bg-white">
          <div className="flex w-full p-6">
            <div className="flex-grow">
              <div className="text-gray-80 font-semibold text-base">
                Data AWS
              </div>
              <div className="font-medium text-gray-50"></div>
            </div>
            <div className="flex space-x-4"></div>
          </div>
          <div className="border-t">
            <div className="px-6 my-4 flex">
              <div className="flex-grow">Filter</div>
              <Image
                alt=""
                src={showFilter ? "/chevron-down.svg" : "/chevron-up.svg"}
                width={20}
                height={20}
                onClick={() => setShowFilter(!showFilter)}
              />
            </div>
            {showFilter && (
              <div className="text-black min-h-[200px] ">
                <div className="flex px-6 py-5 space-x-6">
                  <div className=" flex my-auto">Data</div>
                  <CustomSelect
                    options={dummyPT}
                    value={pt}
                    onChange={(e: string) => setPt(e)}
                    placeholder="PT"
                  />
                  <CustomSelect
                    options={dummyKebun.filter((kebun) => kebun.value !== "")}
                    value={kebun}
                    onChange={(e: string) => setKebun(e)}
                    placeholder="Kebun"
                  />
                  <CustomSelect
                    options={dummyDevice.filter((aws) =>
                      aws.value.includes(kebun ?? "")
                    )}
                    value={device}
                    onChange={(e: string) => setDevice(e)}
                    placeholder="Device"
                  />
                  <div className="flex-grow" />
                </div>
                <div className="flex px-6 pb-5 space-x-6">
                  <CustomSelectField
                    options={[
                      {
                        label: "Evaportranpiration",
                        value: "evaportranpiration",
                      },
                      { label: "Humidity", value: "humidity" },
                      { label: "Rainfall", value: "rainfall" },
                      { label: "Rain Rate", value: "rainRate" },
                      { label: "Solar Radiation", value: "solarRadiation" },
                      { label: "Temperature", value: "temperature" },
                      { label: "Wind Speed", value: "windSpeed" },
                      { label: "Wind Direction", value: "windDirection" },
                    ]}
                    value={tipe}
                    onChange={(e: SetStateAction<string>) => setTipe(e)}
                    name={"status"}
                    label={"Tipe Sensor"}
                  />
                </div>
                <div className="flex px-6 pb-5 space-x-6">
                  <InputDate
                    value={selectedDate}
                    onChange={(date: Date) => setSelectedDate(date)}
                    name={"Tanggal"}
                    label={"Tanggal"}
                    placeholder={"Pilih Tanggal"}
                  />
                </div>
              </div>
            )}
            {tipe !== "" && pt && kebun && device && dummyData.length > 0 ? (
              <div className="border-t">
                <RenderData
                  tipe={tipe}
                  label={dummyLabels}
                  data={dummyData}
                  selectedDate={selectedDate}
                  pt={pt}
                  kebun={kebun}
                  device={device}
                />
              </div>
            ) : (
              <div className="m-4 align-center justify-center">
                No data Found with selected Filter
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
