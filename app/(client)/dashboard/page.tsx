"use client";

import Button, { ButtonColor, ButtonSize } from "@/components/Button";
import DoughnutChart from "@/components/Chart/DoughnutChart";
import CustomSelectField from "@/components/CustomSelectField";
import clsx from "clsx";

export default function Dashboard() {
  const dummies = [
    {
      label: "Idle",
      value: 10,
    },
    {
      label: "Active",
      value: 90,
    },
    {
      label: "Rusak",
      value: 0,
    },
    {
      label: "Alert",
      value: 10,
    },
  ];
  return (
    <div className="m-4">
      <div className="py-8 px-4 space-x-4 flex h-[112px]">
        <CustomSelectField
          options={[]}
          value={undefined}
          onChange={undefined}
          name={"pt"}
          label={"PT"}
        />
        <CustomSelectField
          options={[]}
          value={undefined}
          onChange={undefined}
          name={"kebun"}
          label={"Kebun"}
        />
        <Button
          label="Filter"
          onClick={() => {}}
          buttonSize={ButtonSize.LARGE}
          buttonColor={ButtonColor.PRIMARY}
        />
      </div>
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
          />
        </div>
      </div>
    </div>
  );
}
