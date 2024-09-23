"use client";

import Button, { ButtonColor, ButtonSize } from "@/components/Button";
import DoughnutChart from "@/components/Chart/DoughnutChart";
import CustomSelectField from "@/components/CustomSelectField";
import { dummiesDashboard, dummyKebun, dummyPT } from "@/dummy/data";
import { convertToLabelValue } from "@/shared/helper";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectModal from "./components/SelectModal";

export default function Dashboard() {
  const router = useRouter();

  const [pt, setPt] = useState("");
  const [kebun, setKebun] = useState("");
  const dummies = convertToLabelValue(dummiesDashboard, kebun);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="m-4">
      <div className="py-8 px-4 space-x-4 flex h-[112px]">
        <CustomSelectField
          options={dummyPT}
          value={pt}
          onChange={(e: any) => {
            setPt(e);
          }}
          name={"pt"}
          label={"PT"}
        />
        <CustomSelectField
          options={dummyKebun}
          value={kebun}
          onChange={(e: any) => {
            setKebun(e);
          }}
          name={"kebun"}
          label={"Kebun"}
        />
      </div>
      <SelectModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      <div className={clsx("z-10 grid grid-cols-12 gap-4 mb-4 p-4", {})}>
        <div className="col-span-4 ">
          <DoughnutChart
            title="AWL TMAT (Tinggi Mika Air Tanah)"
            data={dummies}
            below
            noLine
            className="h-full"
            onClick={() => {
              console.log("clicked");
            }}
            subTitle={"Total"}
            onStatusClicked={() => {
              router.push("/sumber/awl");
            }}
            onLaporanHarianClicked={() => {
              setShowModal(true);
            }}
            onLaporanBulananClicked={() => {
              setShowModal(true);
            }}
          />
        </div>
        <div className="col-span-4 ">
          <DoughnutChart
            title="AWL TMAS (Tinggi Muka Air Saluran)"
            data={dummies}
            below
            noLine
            className="h-full"
            onClick={() => {
              console.log("clicked");
            }}
            subTitle={"Total"}
            onStatusClicked={() => {
              router.push("/sumber/awl");
            }}
            onLaporanHarianClicked={() => {
              setShowModal(true);
            }}
            onLaporanBulananClicked={() => {
              setShowModal(true);
            }}
          />
        </div>
        <div className="col-span-4 ">
          <DoughnutChart
            title="AWS"
            data={dummies}
            below
            noLine
            className="h-full"
            onClick={() => {
              console.log("clicked");
            }}
            subTitle={"Total"}
            onStatusClicked={() => {
              router.push("/sumber/aws");
            }}
            onLaporanHarianClicked={() => {
              router.push("/device/aws");
            }}
            onLaporanBulananClicked={() => {
              router.push("/device/aws");
            }}
          />
        </div>
      </div>
    </div>
  );
}
