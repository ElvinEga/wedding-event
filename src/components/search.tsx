"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
import type { Guest } from "@/lib/types";
import RegisterGuest from "./register";
import GuestResults from "./guest";
import { useRef } from "react";
import { useEffect } from "react";

interface SearchGuestProps {
  eventId: string;
}

export default function SearchGuest({ eventId }: SearchGuestProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `/api/event/${eventId}/autocomplete?q=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, eventId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
        <div className="relative">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter your name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="pr-8"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span>Search</span>
            </Button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg"
            >
              <ul className="py-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-accent"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>

      {searched && !loading && !showRegister && (
        <>
          {guests.length > 0 ? (
            <GuestResults guests={guests} eventId={eventId} />
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
      {showRegister && <RegisterGuest eventId={eventId} />}
    </div>
  );
}
