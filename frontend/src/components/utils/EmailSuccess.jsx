import { Link } from "react-router";

export default function EmailSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-neutral-900 p-8 text-center text-white">
        <div className="mb-6 text-emerald-400 text-4xl">
          <i className="fa-solid fa-envelope"></i>
        </div>

        <h1 className="text-xl font-semibold">Check your email</h1>

        <p className="mt-3 text-sm text-white/60">
          Verification link sent successfully. Open your inbox to activate your
          account.
        </p>

        <Link
          to="/login"
          className="mt-6 block w-full rounded-lg bg-white text-black py-2 font-medium hover:bg-white/90 transition"
        >
          Back to Login
        </Link>
      </div>
    </section>
  );
}
