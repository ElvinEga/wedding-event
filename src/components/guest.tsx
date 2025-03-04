"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Guest } from "@/lib/types";
import HallLayout from "./hall";
import { PartyPopperIcon } from "lucide-react";

interface GuestResultsProps {
  guests: Guest[];
  eventId: string;
}

export default function GuestResults({ guests, eventId }: GuestResultsProps) {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
  };

  const handleBack = () => {
    setSelectedGuest(null);
  };

  if (selectedGuest) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <PartyPopperIcon size={48} className="text-primary" />
            </div>
            <CardTitle className="text-center text-primary">
              Welcome, {selectedGuest.name}!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Your table number is{" "}
              <span className="font-bold text-primary">
                {selectedGuest.table_no}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              You have {selectedGuest.member_count} seat
              {selectedGuest.member_count !== 1 ? "s" : ""} reserved
            </p>
          </CardContent>
        </Card>

        <HallLayout eventId={eventId} selectedTable={selectedGuest.table_no} />

        <Button onClick={handleBack} className="w-full">
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select your name:</h3>
      <div className="space-y-2">
        {guests.map((guest, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full p-6 text-base justify-start text-left"
            onClick={() => handleSelectGuest(guest)}
          >
            <div>
              <span className="font-medium">{guest.name} </span>
              <span className="text-muted-foreground">
                (Table {guest.table_no} • {guest.member_count} guest
                {guest.member_count !== 1 ? "s" : ""})
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
