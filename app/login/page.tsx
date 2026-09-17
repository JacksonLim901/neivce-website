import { CustomerLoginForm } from "@/components/auth/CustomerLoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-20">
      <p className="text-eyebrow text-muted">Welcome back</p>
      <h1 className="text-h1 mt-4 font-display">Log in</h1>
      <div className="mt-10">
        <CustomerLoginForm />
      </div>
    </div>
  );
}
