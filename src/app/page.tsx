"use client";
import React, { useState } from "react";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignIn() {
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
            Sarah Johnson & Michael Smith
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
            Sarah Johnson & Michael Smith
          </h2>
          <p className="text-gray-600 mb-8">Sunday, June 15, 2025</p>

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
