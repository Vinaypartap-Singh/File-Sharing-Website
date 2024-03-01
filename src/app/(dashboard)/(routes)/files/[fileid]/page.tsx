"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PropsType {
  params: {
    fileid: string;
  };
}

export default function Upload({ params }: PropsType) {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const id = params.fileid;
  const router = useRouter();
  const [fileData, setFileData] = useState<any>([]);

  useEffect(() => {
    const getFiles = async () => {
      const docRef = doc(db, "files", `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFileData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getFiles();
  }, []);

  const onSavePassword = async () => {
    const docRef = doc(db, "files", `${id}`);
    await updateDoc(
      docRef,
      {
        password: password,
      },
      { merge: true }
    );

    setPassword("");

    alert("Password Saved");
  };

  return (
    <>
      <div>
        <Button variant={"outline"} size={"icon"} onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>

        {fileData && (
          <section className="text-gray-600 body-font max-w-3xl m-auto">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
              <Image
                src={"/file.svg"}
                alt="Upload File Image"
                width={0}
                height={0}
                className="w-full "
              />
              <div className="text-center lg:w-2/3 w-full mt-6">
                <h1 className="dark:text-white title-font sm:text-lg text-lg font-medium text-gray-900">
                  File Name:
                  <span className="text-lg">{fileData.fileName}</span>
                </h1>
                <p className="dark:text-white mb-4 leading-relaxed">
                  Uploaded By: {fileData.userEmail}
                </p>
                <div className="relative my-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border w-full py-4 px-2"
                    placeholder="Password For File"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant={"link"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide Password" : "ShowPassword"}
                  </Button>
                </div>

                <div className="space-x-6">
                  <Button onClick={onSavePassword}>Save Password</Button>
                  <Button variant={"outline"}>Share URL</Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
