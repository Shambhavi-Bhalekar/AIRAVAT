"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    useEffect(() => {
      router.push("/landingpage"); // replace with your actual login route
    }, [router])

  );
}
