import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-20">
      <h1 className="font-display text-2xl">Admin Login</h1>
      <p className="mt-2 text-sm text-muted">NEIVCE Trading PLT — content management</p>
      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
}
