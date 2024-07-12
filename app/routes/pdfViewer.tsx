import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PdfViewer({ fileUrl }: any) {
  const [file, setFile] = useState<any>(null);
  // const [fileUrl, setFileUrl] = useState<any>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>("");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        const url = URL.createObjectURL(file);
        setPdfBlobUrl(url);
      } else if (fileUrl) {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      } else {
        console.log("Error while loading pdf");
      }
    };

    fetchData();
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [file, fileUrl]);

  // const handleChange = (e: any) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //   } else {
  //     setFileUrl(e.target.value);
  //   }
  // };

  return (
    <div>
      <div className="relative p-5">
        {/* <div className="flex gap-4  items-center ">
          <input
            id="pdfFile"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className="inline-flex justify-center items-center p-1 text-md font-bold shadow-2xl rounded-lg text-center w-64 h-10 text-gray-500 "
          />
          <span className="text-md text-gray-500">OR</span>
          <input
            id="pdfFileUrl"
            type="text"
            placeholder="Enter file url"
            onChange={handleChange}
            className="inline-flex justify-center items-center p-1 text-lg font-bold shadow-2xl rounded-lg text-center w-full h-10 text-gray-500  "
          />
        </div> */}

        {(file || fileUrl) && (
          <div className="w-full h-[calc(100vh-90px)] ">
            {pdfBlobUrl && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                <Viewer
                  fileUrl={pdfBlobUrl}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
