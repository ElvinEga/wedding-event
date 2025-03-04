"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PartyPopperIcon } from "lucide-react";
import type { Table } from "@/lib/types";
import TableSelection from "./table";

interface RegisterGuestProps {
  eventId: string;
}

export default function RegisterGuest({ eventId }: RegisterGuestProps) {
  const [name, setName] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const isValidPhoneNumber = (number: string) => {
    return /^\+?[0-9]\d{8,14}$/.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim() || memberCount < 1) {
      setError("Please fill in all fields correctly");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Invalid phone number format");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/event/${eventId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch available tables");
      }

      const data = await response.json();

      const tables = data.tables.filter(
        (table: Table) => table.seat_availabe > 0
      );

      if (tables.length === 0) {
        setError("No tables with available seats found");
        return;
      }

      setAvailableTables(tables);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = async (tableNo: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/event/${eventId}/guest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_no: tableNo,
          name,
          phone_number: phoneNumber,
          member_count: memberCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register guest");
      }

      setSelectedTable(tableNo);
      setRegistered(true);
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (registered && selectedTable) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border p-6 text-center">
          <div className="flex justify-center mb-4">
            <PartyPopperIcon size={48} className="text-primary" />
          </div>
          <h3 className="mb-2 text-xl text-primary font-bold">
            Welcome, {name}!
          </h3>
          <p className="mb-4">We are so happy you could join us today!</p>
          <div className="bg-secondary p-4 rounded-lg mb-4">
            <p className="text-gray-700">You are seated at:</p>
            <p className="text-3xl font-bold text-primary">
              Table {selectedTable}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {memberCount} seat{memberCount !== 1 ? "s" : ""} have been reserved
            for you
          </p>
        </div>

        <Button onClick={() => window.location.reload()} className="w-full">
          Back to Search
        </Button>
      </div>
    );
  }

  if (availableTables.length > 0) {
    return (
      <TableSelection
        tables={availableTables}
        onSelectTable={handleTableSelect}
        loading={loading}
        eventId={eventId}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Register as a New Guest</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your details to find an available table
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="memberCount">
            Number of Family Members (including you)
          </Label>
          <Input
            id="memberCount"
            type="number"
            min="1"
            value={memberCount}
            onChange={(e) =>
              setMemberCount(Number.parseInt(e.target.value) || 1)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding Tables...
            </>
          ) : (
            "Find Available Tables"
          )}
        </Button>
      </form>
    </div>
  );
}
