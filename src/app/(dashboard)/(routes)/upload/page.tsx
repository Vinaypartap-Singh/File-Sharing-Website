import UploadForm from "@/app/(dashboard)/_components/UploadForm";
import { Button } from "@/components/ui/button";

export default function Upload() {
  return (
    <div>
      <h1 className="text-2xl text-center mb-10">
        Start <span className="font-bold text-red-500">Uploading </span>
        file and <span className="font-bold text-red-500">Share</span> it.
      </h1>
      <UploadForm />
    </div>
  );
}
