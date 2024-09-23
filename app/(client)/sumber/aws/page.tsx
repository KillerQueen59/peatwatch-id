"use client";
import Table from "@/components/Table/Table";
import AWSColumn from "./components/AWSColumn";
import { dummyAws, dummyPT } from "@/dummy/data";
import { SetStateAction, useState } from "react";
import CustomSelectField from "@/components/CustomSelectField";
import Button, { ButtonSize, ButtonColor } from "@/components/Button";
import DetailModal from "./components/DetailModal";
import { downloadCsv, downloadPdf } from "@/hooks/useExport";

export default function AWS() {
  const [showModal, setShowModal] = useState(false);
  const columns = AWSColumn(setShowModal);

  return (
    <div>
      <DetailModal
        header={""}
        subHeader={""}
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <div className="w-full p-8">
        <div className="rounded-2xl	w-full border border-gray-30 bg-white">
          <div className="flex w-full p-6">
            <div className="flex-grow">
              <div className="text-gray-80 font-semibold text-base">
                AWS Device
              </div>
              <div className="font-medium text-gray-50"></div>
            </div>
            <div className="flex space-x-4"></div>
          </div>
          <div className="text-black">
            <div className="flex border-t px-6 pt-5 pb-2 space-x-6">
              <CustomSelectField
                options={[{ value: "normal", label: "Normal" }]}
                value={{
                  value: "normal",
                  label: "Normal",
                }}
                onChange={() => {}}
                name={"status"}
                label={"Status"}
              />
              <CustomSelectField
                options={dummyPT}
                value={{
                  value: "XYZ",
                  label: "XYZ",
                }}
                onChange={() => {}}
                name={"pt"}
                label={"PT"}
              />
              <CustomSelectField
                options={[]}
                value={""}
                onChange={undefined}
                name={"device"}
                label={"Device"}
              />
              <div className="flex-grow" />
              <Button
                label="PDF"
                onClick={() => {
                  downloadPdf(dummyAws);
                }}
                buttonSize={ButtonSize.LARGE}
                buttonColor={ButtonColor.PRIMARY}
              />
              <Button
                label="Excel"
                onClick={() => {
                  downloadCsv(dummyAws);
                }}
                buttonSize={ButtonSize.LARGE}
                buttonColor={ButtonColor.PRIMARY}
              />
            </div>
            <Table
              data={dummyAws}
              columns={columns}
              pageIndex={0}
              setPageIndex={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
