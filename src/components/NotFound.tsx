'use client';

import Head from "next/head";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from "react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <>
      <Head>
        <title>Page Not Found - 404 Error | Downscale Weight Loss Clinic</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Downscale Weight Loss Clinic's homepage to continue your weight loss journey." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
