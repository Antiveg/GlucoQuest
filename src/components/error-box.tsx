"use client"
import React from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: string | { status?: number; message: string };
}

const ErrorBox = ({ error }: ErrorProps) => {

  const status = typeof error === 'string' ? undefined : error.status;
  const message = typeof error === 'string' ? error : error.message;

  return (
    <div className="font-sans flex min-h-screen w-full flex-col items-center justify-center w-full h-full bg-red-50 p-6 text-center">
      <h1 className="font-sans text-6xl font-bold text-red-600 mb-4">
        {status ?? 'Error'}
      </h1>
      <p className="font-sans text-xl text-red-700 mb-8">{message ?? 'Something went wrong.'}</p>
      <Link
        href="/"
        className="w-full p-6 md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorBox;