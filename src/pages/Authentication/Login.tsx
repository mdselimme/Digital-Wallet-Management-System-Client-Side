import { LoginForm } from "@/components/Authentication/LogInForm";

export default function Login() {
  return (
    <main
      className="
        relative isolate flex min-h-screen items-center justify-center
        bg-muted
        px-4 py-10
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15),transparent_60%)]
        "
      />

      {/* Login card wrapper */}
      <div className="relative z-10 w-full max-w-5xl">
        <LoginForm />
      </div>
    </main>
  );
}
