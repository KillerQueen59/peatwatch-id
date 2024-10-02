"use client";

import CustomSelect from "@/components/CustomSelect";
import CustomSelectField from "@/components/CustomSelectField";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import RenderData from "./component/RenderData";
import InputDate from "@/components/InputDate/InputDate";
import { useAwsImpl } from "./useAwsImpl";

export default function AWS() {
  const {
    pt,
    aws,
    labels,
    kebun,
    device,
    selectedDate,
    kebuns,
    devices,
    pts,
    loading: isLoading,
    showFilter,
    tipe,
    setShowFilter,
    setPt,
    setKebun,
    setDevice,
    setTipe,
    setSelectedDate,
  } = useAwsImpl();

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
          {!isLoading && (
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
                      options={pts}
                      value={pt}
                      onChange={(e: string) => setPt(e)}
                      placeholder="PT"
                    />
                    <CustomSelect
                      options={kebuns.filter(
                        (kebun: any) => kebun.value !== ""
                      )}
                      value={kebun}
                      onChange={(e: string) => setKebun(e)}
                      placeholder="Kebun"
                    />
                    <CustomSelect
                      options={devices.filter(
                        (aws: any) =>
                          aws.value.includes(kebun ?? "") &&
                          aws.value.includes("AWS")
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
              {tipe !== "" && pt && kebun && device && aws.length > 0 ? (
                <div className="border-t">
                  <RenderData
                    tipe={tipe}
                    label={labels}
                    data={aws}
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
          )}
        </div>
      </div>
    </div>
  );
}
