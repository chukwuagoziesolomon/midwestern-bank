"use client";

import { useEffect } from 'react';
import { useLoading } from '@/lib/LoadingContext';
import { setLoadingCallbacks } from '@/lib/api';

export default function LoadingInitializer() {
  const { setLoading, setLoadingMessage } = useLoading();

  useEffect(() => {
    // Set up the loading callbacks for the API client
    setLoadingCallbacks(setLoading, setLoadingMessage);
  }, [setLoading, setLoadingMessage]);

  return null; // This component doesn't render anything
}