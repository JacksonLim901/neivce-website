import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-20">
      <p className="text-eyebrow text-muted">Create an account</p>
      <h1 className="text-h1 mt-4 font-display">Register</h1>
      <div className="mt-10">
        <RegisterForm />
      </div>
    </div>
  );
}
