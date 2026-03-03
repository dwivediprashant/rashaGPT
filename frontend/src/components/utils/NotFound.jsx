import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}