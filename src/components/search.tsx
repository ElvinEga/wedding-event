"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import type { Guest } from "@/lib/types";

interface SearchGuestProps {
  eventId: string;
}

export default function SearchGuest({ eventId }: SearchGuestProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setSearched(true);
      setShowRegister(false);

      const response = await fetch(
        `/api/event/${eventId}/guests?q=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error("Failed to search guests");
      }

      const data = await response.json();
      setGuests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </form>

      {searched && !loading && (
        <>
          {guests.length > 0 ? (
            <div>Guest Search</div>
          ) : (
            <div className="rounded-lg border p-4 text-center">
              <p className="mb-4">No guests found with that name.</p>
              <Button onClick={handleRegisterClick}>
                Register as a New Guest
              </Button>
            </div>
          )}
        </>
      )}

      <div>Register</div>
    </div>
  );
}
