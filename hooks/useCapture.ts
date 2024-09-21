import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useCapture = (id: string) => {
  const downloadPdf = (canvas: HTMLCanvasElement, fileName: string) => {
    const pdf = new jsPDF("p", "pt", "a4");

    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 595.28; // A4 width in pt
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
  };

  const captureComponent = (name: string) => {
    const componentNode = document.getElementById(name);

    if (componentNode) {
      const originalWidth = componentNode.scrollWidth;
      const originalHeight = componentNode.scrollHeight;

      const originalOverflow = componentNode.style.overflow;
      componentNode.style.overflow = "visible";
      componentNode.style.width = `${originalWidth}px`;

      html2canvas(componentNode, {
        scrollX: 0,
        scrollY: 0,
        width: originalWidth,
        height: originalHeight,
        useCORS: true,
      })
        .then((canvas) => {
          downloadPdf(canvas, id);

          componentNode.style.overflow = originalOverflow;
          componentNode.style.width = "";
        })
        .catch((error) => {
          console.log("Error capturing component:", error);
        });
    }
  };

  return {
    captureComponent,
  };
};
