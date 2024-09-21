"use client";

import dynamic from "next/dynamic";
const LineChart = dynamic(
  () => import("../../../../components/Chart/LineChart/LineChart"),
  { ssr: false }
);

export default function ARS() {
  return <LineChart />;
}
