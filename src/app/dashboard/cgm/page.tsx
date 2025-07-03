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
import {
  Smartphone,
  Fingerprint,
  RefreshCw,
  Plus,
  LinkIcon,
  Power,
  Trash,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useCGMDevicesByUserId, useDeleteCGMDevice, useSyncCGMDevice, useUpdateCGMDeviceConnectionStatus } from "@/lib/client-queries/cgm-devices";
import Loading from "@/components/loading";
import ErrorBox from "@/components/error-box";
import { FaSpinner } from "react-icons/fa";

export default function DeviceIntegrationPage() {
  // const [device, setDevice] = useState({
  //   deviceName: "Dexcom G7",
  //   deviceId: "A4B8-C7D6-E5F4",
  //   isConnected: true,
  //   lastSync: new Date(),
  //   isSyncing: false,
  // });
  const { data: devices, isLoading: getDeviceLoading, isError, error } = useCGMDevicesByUserId()
  const { mutate: changeConnectionStatus, isPending: connectionChangePending } = useUpdateCGMDeviceConnectionStatus()
  const { mutate: changeLastSync, isPending: lastSyncPending } = useSyncCGMDevice()
  const { mutate: deleteCGMDevice, isPending: deletePending } = useDeleteCGMDevice()

  if(getDeviceLoading) return <Loading message="Loading User Glucose Loading"/>
  if(isError) return <ErrorBox error={error}/>

  return (
    <div className="min-h-screen w-full bg-[#F0F8FF] font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center gap-2">
              <LinkIcon /> CGM Integration
            </h1>
          </div>
          <Link
            href="/dashboard/cgm/add"
            className="w-full p-6 md:w-auto bg-[#4741A6] text-white font-bold text-md h-12 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#3b368a] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Device
          </Link>
        </header>

        <div className="flex flex-col max-h-[70vh] overflow-y-auto space-y-6 p-2">
          {(devices && devices.length > 0) ? devices.map((device) => (
            <Card
              key={device.deviceId}
              className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000]"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone size={20} /> {device?.deviceName}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                  <Fingerprint size={14} /> {device?.deviceId}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-col justify-between items-center gap-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <div
                    className={`w-32 h-32 rounded-full border-2 border-black flex items-center justify-center transition-all ${
                      device?.isConnected ? "bg-green-500" : "bg-red-500"
                    } shadow-[4px_4px_0px_#000]`}
                  >
                    <Power className="h-12 w-12 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div className="text-center sm:text-center">
                  <p
                    className={`font-bold text-lg ${
                      device?.isConnected ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {device?.isConnected ? "Connected" : "Disconnected"}
                  </p>
                  <p className="font-semibold">Last Sync At:</p>
                  <p className="text-gray-600">
                    {device?.lastSyncAt && format(device.lastSyncAt, "MMMM d, yyyy 'at' hh:mm a")}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t-2 border-black grid grid-cols-3 gap-2">
                <Button
                  onClick={() => changeLastSync({ 
                    did: device.id,
                    lastSyncAt: new Date().toISOString(),
                    isConnected: Boolean(device.isConnected)
                  })}
                  disabled={lastSyncPending || !device.isConnected}
                  variant="outline"
                  className="cursor-pointer h-12 rounded-lg border-2 border-black font-bold"
                >
                  <RefreshCw
                    className={`mr-2 h-5 w-5 ${
                      lastSyncPending ? "animate-spin" : ""
                    }`}
                  />
                  {lastSyncPending ? "Syncing..." : "Sync Now"}
                </Button>
                <Button
                  onClick={() => deleteCGMDevice(device.id)}
                  disabled={deletePending}
                  variant="outline"
                  className="cursor-pointer h-12 rounded-lg border-2 border-black font-bold"
                >
                  {deletePending ? <FaSpinner className="mr-2 h-5 w-5"/> : <LinkIcon className="mr-2 h-5 w-5"/>}
                  {deletePending ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  onClick={() => changeConnectionStatus({ 
                    did: device.id,
                    lastSyncAt: new Date().toISOString(),
                    isConnected: !device.isConnected
                  })}
                  disabled={connectionChangePending}
                  variant="outline"
                  className="cursor-pointer h-12 rounded-lg border-2 border-black font-bold"
                >
                  {connectionChangePending ? <FaSpinner className="mr-2 h-5 w-5"/> : <LinkIcon className="mr-2 h-5 w-5"/>}
                  {connectionChangePending ? "Connecting..." : (device.isConnected ? "Disconnect" : "Connect")}
                </Button>
              </CardFooter>
            </Card>))
            : (<span className="justify-center flex ">No Device Integrated Yet...</span>)}
        </div>
      </div>
    </div>
  );
}
