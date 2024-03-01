"use client";

import { useRouter } from "next/navigation";
import UploadForm from "@/app/(dashboard)/_components/UploadForm";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../../firebase";
import ProgressBar from "../../_components/ProgressBar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import GenerateRandom from "../../_components/generateRandom";

export default function Upload() {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const uploadFile = (file: any) => {
    const storageRef = ref(storage, "files/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            console.log("File available at", downloadURL);
            saveInfo(file, downloadURL);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
  };

  const saveInfo = async (file: any, fileURL: any) => {
    const fileid = GenerateRandom();
    const filesDocRef = doc(db, "files", `${fileid}`);
    await setDoc(filesDocRef, {
      fileURL: fileURL,
      fileName: file.name,
      fileSize: file.size,
      fileID: fileid,
      userId: user.user?.id,
      createdAt: Date.now().toLocaleString(),
      userEmail: user.user?.primaryEmailAddress?.emailAddress,
      password: "",
    });

    router.push(`/files/${fileid}`);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-2xl text-center mb-10">
            Start <span className="font-bold text-red-500">Uploading </span>
            file and <span className="font-bold text-red-500">Share</span> it.
          </h1>
          <UploadForm uploadBtnClick={(file: any) => uploadFile(file[0])} />
          {progress ? <ProgressBar progress={progress} /> : null}
        </div>
      )}
    </>
  );
}
