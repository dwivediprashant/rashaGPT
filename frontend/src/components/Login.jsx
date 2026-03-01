import { Link } from "react-router";
export default function Login() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl  p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,1)]">
        <form className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-white/70">
            Email
            <input
              autoComplete="username"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-white/70">
            Password
            <input
              autoComplete="current-password"
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
              placeholder="xxxxxx"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white "
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-white hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
