"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileTextIcon } from "lucide-react";

export default function UserFiles() {
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<any>([]);
  const { user } = useUser();
  useEffect(() => {
    const getData = async () => {
      const collectonRef = collection(db, "files");
      const q = query(collectonRef, where("userId", "==", user?.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData((prev: any) => [...prev, doc.data()]);
      });
    };

    getData();
  }, [user]);
  return (
    <div>
      {userData ? (
        <div>
          <h1 className="text-2xl font-bold">Your Uploads</h1>
          <div className="mt-5 gap-6 flex flex-wrap justify-between">
            {userData.map((file: any, index: number) => {
              return (
                <Card key={index} className="p-5 w-[30%]">
                  <CardContent>
                    <div className="space-y-4">
                      <h1 className="text-xl font-bold flex items-center gap-2">
                        <FileTextIcon className="text-red-500 h-8 w-8" />
                        {file.fileName}
                      </h1>
                      <p>
                        <span className="font-bold">File Size:</span>{" "}
                        {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p>Shared By {file.userEmail}</p>

                      <Button asChild className="bg-red-500 hover:bg-red-700">
                        <Link href={file?.fileURL}>Download</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>NO Data</h1>
      )}
    </div>
  );
}
