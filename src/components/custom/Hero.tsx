import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="max-w-5xl m-auto pt-20 space-y-10">
      <h1 className="text-5xl text-center font-semibold">
        <span className="text-red-500">Upload, Save</span> and easily{" "}
        <span className="text-red-500"> Share</span> your files.
      </h1>
      <p className="text-center mt-10 leading-8">
        Sync share typically refers to a feature or functionality in software
        that allows users to synchronize files or data across multiple devices
        or users in real-time or near-real-time. It enables seamless
        collaboration and ensures that all parties have access to the most
        up-to-date information. Sync share is commonly used in cloud storage
        services, document collaboration platforms, project management tools,
        and similar applications to facilitate teamwork and improve productivity
        by keeping everyone on the same page.
      </p>
      <div className="flex items-center justify-center gap-10">
        <Button>Get Started</Button>
        <Button variant={"outline"}>Learn More</Button>
      </div>
    </div>
  );
}
