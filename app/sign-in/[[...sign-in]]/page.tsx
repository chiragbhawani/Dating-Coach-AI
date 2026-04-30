import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-5 py-12">
      <SignIn />
    </main>
  );
}
