"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Fingerprint, ArrowLeft, LinkIcon } from "lucide-react";
import Link from "next/link";
import { useCreateCGMDevice } from "@/lib/client-queries/cgm-devices";

export default function DeviceIntegrationPage() {
  const [deviceName, setDeviceName] = useState("Dexcom G7");
  const [deviceId, setDeviceId] = useState("A4B8-C7D6-E5F4");
  const { mutate: createCGMDevice, isPending: createPending } = useCreateCGMDevice()

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <Link
              href="/dashboard/cgm"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black font-semibold mb-2"
            >
              <ArrowLeft size={16} /> Back to CGM
            </Link>
            <h1 className="text-3xl font-bold text-black flex items-center gap-2">
              <LinkIcon /> CGM Integration
            </h1>
          </div>
        </header>

        {/* Main Form Card */}
        <Card className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]">
          <CardHeader>
            <CardTitle>Connect Your Device</CardTitle>
            <CardDescription>
              Enter your CGM details to automatically sync your glucose
              readings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Device Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="device-name"
                className="flex items-center gap-2 font-semibold"
              >
                <Smartphone size={16} /> Device Name
              </Label>
              <Input
                id="device-name"
                placeholder="e.g., Dexcom G6"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="border-black h-12"
              />
            </div>

            {/* Device ID Input */}
            <div className="space-y-2">
              <Label
                htmlFor="device-id"
                className="flex items-center gap-2 font-semibold"
              >
                <Fingerprint size={16} /> Device ID
              </Label>
              <Input
                id="device-id"
                placeholder="Enter unique device identifier"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="border-black h-12"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6 border-t-2 border-black">
            <Button
            className="w-full sm:w-auto bg-[#4741A6] text-white font-bold text-lg h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            onClick={() => {
              const date = (new Date()).toISOString()
              createCGMDevice({ 
                deviceId: deviceId, 
                deviceName: deviceName,
                isConnected: true,
                connectedAt: date,
                lastSyncAt: date
              })
            }}>
              Save & Connect
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
