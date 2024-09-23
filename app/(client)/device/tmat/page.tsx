"use client";

import LineChart from "@/components/Chart/LineChart/LineChart";
import CustomSelect from "@/components/CustomSelect";
import { useState } from "react";
import Image from "next/image";
import dummyData2 from "@/dummy/tmat_dummy.json";
import dayjs from "dayjs";
import InputDate from "@/components/InputDate/InputDate";
import {
  dummyPT,
  dummyKebun,
  dummyDevice,
  dummyDeviceAwl,
  dummyKebunAwl,
} from "@/dummy/data";

export default function TMAT() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dummyData = dummyData2
    .map((data) => {
      return {
        ...data,
        Tanggal: dayjs(data.Tanggal).format("DD/MM/YYYY HH:mm:ss.SSS"),
      };
    })
    .filter((data) => {
      return (
        data.Tanggal.split(" ").length > 0 &&
        data.Tanggal.split(" ")[0] === dayjs(selectedDate).format("DD/MM/YYYY")
      );
    });

  const [pt, setPt] = useState("");
  const [kebun, setKebun] = useState("");
  const [device, setDevice] = useState("");

  const dummyLabels = dummyData.map((data) => {
    return data.Tanggal.split(" ")[1].slice(0, 5);
  });

  const [showFilter, setShowFilter] = useState(true);

  return (
    <div>
      <div className="w-full p-8">
        <div className="rounded-2xl	w-full border border-gray-30 bg-white">
          <div className="flex w-full p-6">
            <div className="flex-grow">
              <div className="text-gray-80 font-semibold text-base">
                Laporan TMAT
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
                    options={dummyKebunAwl.filter(
                      (kebun) => kebun.value !== ""
                    )}
                    value={kebun}
                    onChange={(e: string) => setKebun(e)}
                    placeholder="Kebun"
                  />
                  <CustomSelect
                    options={dummyDeviceAwl.filter((aws) =>
                      aws.value.includes(kebun ?? "")
                    )}
                    value={device}
                    onChange={(e: string) => setDevice(e)}
                    placeholder="Device"
                  />
                  <div className="flex-grow" />
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
            {pt && kebun && device && dummyData.length > 0 ? (
              <div className="border-t">
                <LineChart
                  label={dummyLabels}
                  upperTitle="Laporan TMAT"
                  title="Tinggi Muka Air Tanah"
                  data={[
                    dummyData.map((data) => {
                      return data["Ketinggian (cm)"];
                    }),
                  ]}
                  xAxisTitle="Jam"
                  yAxisTitle="TMAT (cm)"
                  dataSatuan="cm"
                  dataType="TMAT"
                  selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
                  id="tmat"
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
