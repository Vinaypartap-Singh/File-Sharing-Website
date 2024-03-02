"use client";

import { Button } from "@/components/ui/button";
import { FileIcon } from "@radix-ui/react-icons";
import { doc, getDoc } from "firebase/firestore";
import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import Link from "next/link";

export default function FileDownload({ params }: { params: { id: string } }) {
  const id = params.id;
  const [fileData, setFileData] = useState<any>(null);
  const [password, setPassword] = useState<String>("");
  const [filePassword, SetFilePassword] = useState<String>("");

  useEffect(() => {
    const getFiles = async () => {
      const docRef = doc(db, "files", `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFileData(docSnap.data());
        SetFilePassword(docSnap.data().password);
      } else {
        console.log("No such document!");
      }
    };

    getFiles();
  }, []);

  console.log(password, fileData?.password);
  console.log(fileData?.password);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {fileData ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileTextIcon className="text-red-500 h-8 w-8" />
            Download The File
          </h1>
          <p>
            <span className="font-bold">File Name:</span> {fileData.fileName}{" "}
            <span className="font-bold">File Size:</span>{" "}
            {(fileData.fileSize / 1024 / 1024).toFixed(2)} MB
          </p>
          <p>Shared By {fileData.userEmail}</p>
          {fileData.password ? (
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="Enter Password"
                className="border-2 border-gray-300 p-2 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password === fileData.password ? (
                <Button asChild className="bg-red-500 hover:bg-red-700">
                  <Link href={fileData?.fileURL}>Download</Link>
                </Button>
              ) : (
                <Button
                  disabled={password !== fileData.password}
                  className="bg-red-500 opacity:50"
                >
                  Download
                </Button>
              )}
            </div>
          ) : (
            <Button asChild>
              <Link
                href={fileData?.fileURL}
                className="bg-red-500 text-white hover:bg-red-700 hover:text-white"
              >
                Download
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Loading....</h1>
        </>
      )}
    </div>
  );
}
