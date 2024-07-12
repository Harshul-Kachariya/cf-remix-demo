import { Drawer } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import { FaUpload } from "react-icons/fa6";
import PdfViewer from "./pdfViewer";

const InputFiles = () => {
  const [filesData, setFilesData] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [filesDataUrl, setFilesDataUrl] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: any) => {
    console.log(e.target.files[0]);
    setFilesData(e.target.files[0]);
    setFilesDataUrl(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    console.log(filesData);
    const uploadFiles = async () => {
      try {
        if (filesData) {
          await axios
            .post("https://api3-beta.contractorforeman.net/api/upload", {
              userId: 109871,
              companyId: 829,
              isFileNameNeeded: true,
              moduleName: "project_permits",
              fileType: filesData?.type,
              fileName: filesData?.name,
              isThumbRequired: true,
            })
            .then((res) => console.log(res.data));
        }
      } catch (error) {
        console.log("Eroor while uploading files", error);
      }
    };

    uploadFiles();
  }, [filesData]);

  const getData = async () => {
    try {
      await axios
        .get("https://api-beta.contractorforeman.net/service.php", {
          params: {
            all_project_check: "0",
            company_id: 829,
            curr_time: "2024-07-12 05:06:31",
            "filter[]":
              '{"customer":"","tags":"","extension":"","project":"147535"}',
            force_login: "0",
            from: "panel",
            global_project: "",
            iframe_call: 0,
            length: "40",
            op: "get_aws_files",
            page: 0,
            tz: "+05:30",
            tzid: "Asia/Calcutta",
            user_id: 109871,
            version: "web",
          },
        })
        .then((res) => setData(res.data.data));
      setFilesData(null);
      setIsOpen(false);
    } catch (error) {
      console.log("Eroor while uploading files", error);
    }
  };

  return (
    <div className=" px-4 py-16">
      <div>
        <div className="w-full h-48 flex  gap-3 bg-slate-200 items-center shadow-lg rounded-lg p-2">
          <button
            className="h-[90%] rounded-lg p-2 w-40 flex justify-center items-center bg-white"
            onClick={handleOpen}
          >
            {" "}
            <FaPlus className="text-2xl" />
          </button>
          {data.length > 0 &&
            data?.map((item: any) => (
              <div className="w-40 h-[90%]  gap-3 bg-white   items -center shadow-lg rounded-lg overflow-hidden">
                {item.file_ext === "pdf" ? (
                  <button
                    onClick={() => setFile(item.file_path)}
                    className="flex  justify-center items-center w-full h-full"
                  >
                    <GrDocumentPdf className="text-9xl" />
                  </button>
                ) : (
                  <button>
                    <img
                      src={item.file_path}
                      alt={item.file_name}
                      className="w-full h-full object-cover "
                    />
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
      <Drawer
        title="Files and photos"
        onClose={onClose}
        open={isOpen}
        size="large"
      >
        <div className="h-44">
          <input
            type="file"
            multiple
            className="hidden"
            id="filesNphotos"
            onChange={handleInputChange}
          />
          <label htmlFor="filesNphotos">
            <div
              className="flex items-center justify-center w-full h-32 bg-gray-100 rounded
            border-dashed border-2 border-gray-400 cursor-pointer hover:shadow-lg"
            >
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-gray-
                600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24
                24"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
              <div className="z-50 flex flex-col gap-2 justify-center items-center mx-auto">
                <p className="ant-upload-drag-icon flex justify-center items-center">
                  <FaUpload />
                </p>
                <p className="ant-upload-text">
                  Click file or images to this area to upload
                </p>
              </div>
            </div>
          </label>
        </div>

        {filesData && (
          <div className="bottom-0 flex justify-end  px-2">
            <button
              className="p-2 w-full text-white text-lg bg-indigo-600 rounded-lg shadow-md shadow-transparent hover:shadow-indigo-600 "
              onClick={getData}
            >
              save
            </button>
          </div>
        )}
      </Drawer>

      <div>
        {file && (
          <div className="flex flex-col gap-2 mt-5">
            <button
              onClick={() => setFile(null)}
              className="p-2 text-lg rounded-lg shadow-lg bg-slate-300 w-28"
            >
              Close
            </button>
            <PdfViewer fileUrl={file} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFiles;
