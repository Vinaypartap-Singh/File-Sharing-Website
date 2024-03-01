import { Button } from "@/components/ui/button";
import { Cross1Icon, FileIcon } from "@radix-ui/react-icons";
import React from "react";

export default function FilePreview({ file, removeFile }: any) {
  return (
    <div className="mt-10 flex gap-5 items-center">
      <FileIcon className="w-10 h-10 text-red-500" />
      <div>
        <p>{file?.name}</p>
        <p>
          {file?.type} / {(file?.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <Button
        variant={"outline"}
        className="bg-transparent border-none"
        onClick={removeFile}
      >
        <Cross1Icon className="text-red-500" />
      </Button>
    </div>
  );
}
