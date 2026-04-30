import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-5 py-12">
      <SignUp />
    </main>
  );
}
