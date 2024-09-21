"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RouterComponent from "./RouterComponent";
import {
  ChevronDownOutline,
  ChevronUp,
  ChevronUpOutline,
  CogOutline,
  Database,
  DocumentReport,
  HomeOutline,
  Server,
  ServerOutline,
} from "heroicons-react";
import clsx from "clsx";

type LaporanSidebarProps = {
  isOpen: boolean;
  pathname: string;
};

export default function LaporanSidebar({
  isOpen,
  pathname,
}: LaporanSidebarProps) {
  const [showManagement, setShowManagement] = useState(true);
  const [showDevice, setShowDevice] = useState(true);
  const [showStation, setShowStation] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setShowManagement(true);
    }
  }, [isOpen]);

  return (
    <div>
      <div>
        <div
          className={`flex h-[50px] items-center text-black cursor-pointer px-8 gap-3 ${
            pathname.includes("/device") || pathname.includes("/station")
              ? "bg-primary-10 border-r-4 border-primary-90 text-primary-60"
              : "text-gray-80"
          }`}
          onClick={() => {
            setShowManagement(!showManagement);
          }}>
          <DocumentReport
            className={clsx("h-[20px] w-[20px]", {
              "text-primary-60":
                pathname.includes("/device") || pathname.includes("/station"),
              "text-gray-80":
                !pathname.includes("/device") && !pathname.includes("/station"),
            })}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          {isOpen && (
            <>
              <div className="flex-grow">Laporan </div>
              {showManagement ? (
                <ChevronUpOutline
                  className={clsx("h-[20px] w-[20px]", {
                    "text-primary-60":
                      pathname.includes("/device") ||
                      pathname.includes("/station"),
                    "text-gray-80":
                      !pathname.includes("/device") &&
                      !pathname.includes("/station"),
                  })}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              ) : (
                <ChevronDownOutline
                  className={clsx("h-[20px] w-[20px]", {
                    "text-primary-60":
                      pathname.includes("/device") ||
                      pathname.includes("/station"),
                    "text-gray-80":
                      !pathname.includes("/device") &&
                      !pathname.includes("/station"),
                  })}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              )}
            </>
          )}
        </div>
      </div>
      {isOpen && showManagement && (
        <>
          <>
            <div
              className={`flex h-[50px] items-center text-black cursor-pointer pr-8 pl-12 gap-3 ${
                pathname.includes("/device")
                  ? "bg-primary-10 border-r-4 border-primary-90 text-primary-60"
                  : "text-gray-80"
              }`}
              onClick={() => {
                setShowDevice(!showDevice);
              }}>
              <CogOutline
                className={clsx("h-[20px] w-[20px]", {
                  "text-primary-60": pathname.includes("/device"),
                  "text-gray-80": !pathname.includes("/device"),
                })}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              {isOpen && (
                <>
                  <div className="flex-grow">Device </div>
                  {showDevice ? (
                    <ChevronUpOutline
                      className={clsx("h-[20px] w-[20px]", {
                        "text-primary-60": pathname.includes("/device"),
                        "text-gray-80": !pathname.includes("/device"),
                      })}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  ) : (
                    <ChevronDownOutline
                      className={clsx("h-[20px] w-[20px]", {
                        "text-primary-60": pathname.includes("/device"),
                        "text-gray-80": !pathname.includes("/device"),
                      })}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  )}
                </>
              )}
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in ${
                showDevice ? "max-h-[150px]" : "max-h-0"
              }`}>
              <RouterComponent
                parentPathname={`${pathname}`}
                pathname={`/device/aws`}
                router={router}
                label={"AWS"}
                icon={
                  <Server
                    className={clsx("h-[20px] w-[20px]", {
                      "text-primary-60": pathname.includes("/device/aws"),
                      "text-gray-80": !pathname.includes("/device/aws"),
                    })}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                }
                isOpen={isOpen}
                customClass="pl-16 text-sm"
              />
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in ${
                showDevice ? "max-h-[150px]" : "max-h-0"
              }`}>
              <RouterComponent
                parentPathname={`${pathname}`}
                pathname={`/device/tmas`}
                router={router}
                label={"TMAS"}
                icon={
                  <Server
                    className={clsx("h-[20px] w-[20px]", {
                      "text-primary-60": pathname.includes("/device/tmas"),
                      "text-gray-80": !pathname.includes("/device/tmas"),
                    })}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                }
                isOpen={isOpen}
                customClass="pl-16 text-sm"
              />
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in ${
                showDevice ? "max-h-[150px]" : "max-h-0"
              }`}>
              <RouterComponent
                parentPathname={`${pathname}`}
                pathname={`/device/tmat`}
                router={router}
                label={"TMAT"}
                icon={
                  <Server
                    className={clsx("h-[20px] w-[20px]", {
                      "text-primary-60": pathname.includes("/device/tmat"),
                      "text-gray-80": !pathname.includes("/device/tmat"),
                    })}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                }
                isOpen={isOpen}
                customClass="pl-16 text-sm"
              />
            </div>
          </>
          {/* Station */}
          <>
            {/* <div
              className={`flex h-[50px] items-center text-black cursor-pointer pr-8 pl-12 gap-3 ${
                pathname.includes("/station")
                  ? "bg-primary-10 border-r-4 border-primary-90 text-primary-60"
                  : "text-gray-80"
              }`}
              onClick={() => {
                setShowStation(!showStation);
              }}>
              <CogOutline
                className={clsx("h-[20px] w-[20px]", {
                  "text-primary-60": pathname.includes("/station"),
                  "text-gray-80": !pathname.includes("/station"),
                })}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              {isOpen && (
                <>
                  <div className="flex-grow">Station </div>
                  {showStation ? (
                    <ChevronUpOutline
                      className={clsx("h-[20px] w-[20px]", {
                        "text-primary-60": pathname.includes("/station"),
                        "text-gray-80": !pathname.includes("/station"),
                      })}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  ) : (
                    <ChevronDownOutline
                      className={clsx("h-[20px] w-[20px]", {
                        "text-primary-60": pathname.includes("/station"),
                        "text-gray-80": !pathname.includes("/station"),
                      })}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  )}
                </>
              )}
            </div> */}
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in ${
                showStation ? "max-h-[150px]" : "max-h-0"
              }`}>
              {/* <RouterComponent
                parentPathname={`${pathname}`}
                pathname={`/station/awl-tmat`}
                router={router}
                label={"AWL TMAT"}
                icon={
                  <Server
                    className={clsx("h-[20px] w-[20px]", {
                      "text-primary-60": pathname.includes("/station/awl-tmat"),
                      "text-gray-80": !pathname.includes("/station/awl-tmat"),
                    })}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                }
                isOpen={isOpen}
                customClass="pl-16 text-sm"
              />
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in ${
                showStation ? "max-h-[150px]" : "max-h-0"
              }`}>
              <RouterComponent
                parentPathname={`${pathname}`}
                pathname={`/station/awl-tmas`}
                router={router}
                label={"AWL TMAS"}
                icon={
                  <Server
                    className={clsx("h-[20px] w-[20px]", {
                      "text-primary-60": pathname.includes("/station/awl-tmas"),
                      "text-gray-80": !pathname.includes("/station/awl-tmas"),
                    })}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                }
                isOpen={isOpen}
                customClass="pl-16 text-sm"
              /> */}
            </div>
          </>
        </>
      )}
    </div>
  );
}
