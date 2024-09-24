import { useCallback, useEffect, useState } from "react";
import { getTmat, getDevice, getKebun, getPt } from "./TmatData";
import dayjs from "dayjs";

export const useTmatImpl = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showFilter, setShowFilter] = useState(true);
  const [pt, setPt] = useState("");
  const [pts, setPts] = useState([]);
  const [kebun, setKebun] = useState("");
  const [kebuns, setKebuns] = useState([]);
  const [device, setDevice] = useState("");
  const [devices, setDevices] = useState([]);
  const [tmat, setTMAT] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPTData = useCallback(() => {
    setIsLoading(true);
    getPt()
      .then((res) => {
        if (res?.data) {
          setPts(
            res.data.map((item: any) => ({
              label: item.name,
              value: item.name,
            }))
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getKebunData = useCallback(() => {
    setIsLoading(true);
    getKebun()
      .then((res) => {
        if (res?.data) {
          setKebuns(
            res.data.map((item: any) => ({
              label: item.name,
              value: item.name,
            }))
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getDeviceData = useCallback(() => {
    setIsLoading(true);
    getDevice()
      .then((res) => {
        if (res?.data) {
          setDevices(
            res.data.map((item: any) => ({
              label: item.name,
              value: item.name,
            }))
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getTmatData = useCallback(() => {
    setIsLoading(true);
    getTmat()
      .then((res) => {
        if (res?.data) {
          setTMAT(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getPTData();
    getTmatData();
    getKebunData();
    getDeviceData();
  }, []);

  return {
    pt,
    tmat: tmat.filter((data: any) => {
      return (
        data.tanggal.split(" ").length > 0 &&
        data.tanggal.split(" ")[0] === dayjs(selectedDate).format("DD/MM/YYYY")
      );
    }),
    labels: tmat
      .filter((data: any) => {
        return (
          data.tanggal.split(" ").length > 0 &&
          data.tanggal.split(" ")[0] ===
            dayjs(selectedDate).format("DD/MM/YYYY")
        );
      })
      .map((data: any) => {
        return data.tanggal.split(" ")[1].slice(0, 5);
      }),
    kebun,
    device,
    selectedDate,
    kebuns,
    devices,
    pts,
    loading: isLoading,
    showFilter,
    setShowFilter,
    setPt,
    setKebun,
    setDevice,
    setSelectedDate,
  };
};
