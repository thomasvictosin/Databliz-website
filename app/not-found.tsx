import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            404
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Page not found
          </p>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-[#3E4095] mb-4">
          Oops! We couldn't find that page.
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
  
        {/* CTA Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 transform hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-400 hover:text-white transition-all duration-200"
          >
            Contact Support
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-xs mt-8">
          Error code: 404
        </p>
      </div>
    </div>
  );
}
