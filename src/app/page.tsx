"use client";
import React, { useState } from "react";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Event } from "@/lib/types";

export default function Home() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId") || "sarah-wedding";

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/event/${eventId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError("Unable to load wedding details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-2 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Purple Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#F7B24D] to-[#ED266F] p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="text-2xl">🦥</span>
            <h1 className="text-5xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F7B24D] to-[#ED266F]">
              GatherGram
            </h1>
          </Link>
        </div>
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">
            {event.bride} & {event.groom}
            <br />
            Wedding
          </h1>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🦥</span>
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F7B24D] to-[#ED266F]">
                GatherGram
              </span>
            </Link>
          </div>

          <h2 className="text-4xl font-bold mb-2">
            {event.bride} & {event.groom}
          </h2>
          <p className="text-gray-600 mb-8">
            {new Date(event.wedding_date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Find Your Table</h2>
              <p className="text-sm text-muted-foreground">
                Enter your name to find your assigned table
              </p>
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter your name"
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600 text-sm">
                Not in the list?{" "}
                <Link
                  href="/register"
                  className="text-violet-600 hover:text-violet-700"
                >
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
