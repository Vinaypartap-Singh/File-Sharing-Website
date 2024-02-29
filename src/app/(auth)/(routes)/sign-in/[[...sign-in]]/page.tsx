import { SignIn } from "@clerk/nextjs";

export default function Signin() {
  return (
    <main className="h-screen flex items-center justify-center">
      <SignIn />
    </main>
  );
}
