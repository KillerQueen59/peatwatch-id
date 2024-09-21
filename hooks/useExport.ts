import { Parser } from "json2csv";
import { saveAs } from "file-saver"; // To download the file
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table formatting

export const downloadCsv = (data) => {
  const fields = [
    { label: "Name", value: "name" },
    { label: "Detail Name", value: "detailName" },
    { label: "ID", value: "id" },
    { label: "Start Date", value: "startDate" },
    { label: "Battery", value: "battery" },
    { label: "Signal", value: "signal" },
    { label: "Sensor", value: "sensor" },
    { label: "Status", value: "status" },
    { label: "Note", value: "note" },
  ];

  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "aws_data.csv");
};

export const downloadPdf = (data) => {
  console.log("data", data);

  const doc = new jsPDF();

  const tableColumn = [
    "Name",
    "Detail Name",
    "ID",
    "Start Date",
    "Battery",
    "Signal",
    "Sensor",
    "Status",
    "Note",
  ];

  const tableRows = data.map((item) => [
    item.name,
    item.detailName,
    item.id,
    item.startDate,
    item.battery,
    item.signal,
    item.sensor,
    item.status,
    item.note,
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("aws_data.pdf");
};
