import { Link } from "react-router";
export default function Register() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-5">
      <div className="w-full max-w-md rounded-3xl  p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,1)]">
        <form className="mt-8 space-y-3">
          <label className="block text-sm font-medium tex-white">
            Username
            <input
              autoComplete="username"
              type="text"
              required
              placeholder="johndoe"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
            />
          </label>

          <label className="block text-sm font-medium tex-white">
            Email
            <input
              autoComplete="username"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none "
            />
          </label>

          <label className="block text-sm font-medium tex-white">
            Password
            <input
              autoComplete="current-password"
              type="password"
              required
              placeholder="xxxxxx"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 mt-2"
          >
            Send verification email
          </button>
          <p className="mt-8 text-center text-sm tex-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-white hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
