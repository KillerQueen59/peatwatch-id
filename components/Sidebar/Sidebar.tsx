"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { getRecoil, resetRecoil, setRecoil } from "recoil-nexus";
import {
  ChevronDoubleRightOutline,
  ChevronDoubleLeftOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
} from "heroicons-react";
import { useRecoilState } from "recoil";
import DashboardSidebar from "./DahboardSidebar";
import SumberSidebar from "./SumberSidebar";
import LaporanSidebar from "./LaporanSidebar";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const router = useRouter();

  return (
    <div
      className={`${
        isOpen ? "min-w-[280px]" : "min-w-[100px]"
      } h-screen flex flex-col bg-white overflow-auto transition-width duration-300 easy border-r border-gray-20`}>
      <div className="px-9 flex bg-white items-center space-x-1.5 py-8 sticky top-0">
        <Image
          src={isOpen ? "/logo.svg" : "/logo_no_text.svg"}
          alt="Mamen Logo"
          width={isOpen ? 140 : 40}
          height={isOpen ? 85 : 25}
          priority
          className="transition-all duration-100 ease-out"
        />
      </div>
      <div
        className="flex h-[50px] pl-8 items-center cursor-pointer text-gray-80 "
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        {isOpen ? (
          <div className="flex space-x-3 items-center h-[50px]">
            <ChevronLeftOutline
              className={"h-[20px] w-[20px] text-gray-100"}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <div> Hide Menu </div>
          </div>
        ) : (
          <ChevronRightOutline
            className={"h-[20px] w-[20px] text-gray-100"}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        )}
      </div>
      <div>
        <DashboardSidebar isOpen={isOpen} pathname={pathname} />
      </div>
      <div>
        <SumberSidebar isOpen={isOpen} pathname={pathname} />
      </div>
      <div>
        <LaporanSidebar isOpen={isOpen} pathname={pathname} />
      </div>
    </div>
  );
}

export default SideBar;
