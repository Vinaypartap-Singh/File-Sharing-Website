import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}
