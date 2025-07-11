import { CgmDevice, CgmDeviceInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// get user cgm devices by userid
async function fetchCGMDevicesByUserId() {
  const res = await fetch(`/api/user/cgm-devices`);
  if (!res.ok) throw new Error("Failed to fetch user's cgm devices");
  return res.json();
}

export function useCGMDevicesByUserId() {
  return useQuery<CgmDevice[], Error>({
    queryKey: ["user-cgm-devices"],
    queryFn: fetchCGMDevicesByUserId,
  });
}

// Create new cgm device for a user
async function createCGMDevice(device: CgmDeviceInput) {
  const res = await fetch(`/api/user/cgm-devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  if (!res.ok) throw new Error("Failed to create glucose reading");
  return res.json();
}

export function useCreateCGMDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCGMDevice,
    onSuccess: (newDevice) => {
        const cacheKey = ["user-cgm-devices"]
        const currentDevices = queryClient.getQueryData<CgmDevice[]>(cacheKey) || [];
        const updatedDevices = [newDevice, ...currentDevices];
        queryClient.setQueryData<CgmDevice[]>(cacheKey, updatedDevices);
        toast.success(`Device ${newDevice.deviceId} created and connected`)
    },
    onError: (error) => {
        toast.error(error.message)
    },
  });
}

// Update cgm device connection status for a user
async function updateCGMDeviceConnectionStatus({ did, lastSyncAt, isConnected } : { did: number, lastSyncAt : string, isConnected : boolean }) {
  const res = await fetch(`/api/user/cgm-devices/connect`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did, lastSyncAt, isConnected }),
  });
  if (!res.ok) throw new Error("Failed to update cgm device connection status");
  return res.json();
}

export function useUpdateCGMDeviceConnectionStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCGMDeviceConnectionStatus,
    onSuccess: (updatedDevice) => {
      const cacheKey = ["user-cgm-devices"];
      queryClient.setQueryData<CgmDevice[]>(cacheKey, (currentDevices) => {
        if (!currentDevices) {
          toast.success(`Device ${updatedDevice.deviceId} ${updatedDevice.isConnected ? "connected" : "disconnected"}.`);
          return [updatedDevice];
        }
        return currentDevices.map((device) => {
          if (device.id === updatedDevice.id) {
            toast.success(`Device ${updatedDevice.deviceId} ${updatedDevice.isConnected ? "connected" : "disconnected"}.`)
          }
          return {
            ...device,
            isConnected: (device.id === updatedDevice.id) ? (updatedDevice.isConnected) : false,
            lastSyncAt: (device.id === updatedDevice.id) ? updatedDevice.lastSyncAt : device.lastSyncAt
          }
        });
      });
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}

// Sync CGM device for a user
async function syncCGMDevice({ did, lastSyncAt, isConnected }: { did: number; lastSyncAt: string; isConnected: boolean }) {
  const res = await fetch(`/api/user/cgm-devices/sync`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did, lastSyncAt, isConnected }),
  });
  if (!res.ok) throw new Error("Failed to sync CGM device");
  return res.json();
}

export function useSyncCGMDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: syncCGMDevice,
    onSuccess: (syncedDevice) => {
      const cacheKey = ["user-cgm-devices"];
      queryClient.setQueryData<CgmDevice[]>(cacheKey, (currentDevices) => {
        if (!currentDevices) return [syncedDevice];
        return currentDevices.map((device) => ({
          ...device,
          lastSyncAt: (device.id === syncedDevice.id ? syncedDevice.lastSyncAt : device.lastSyncAt),
        }));
      });
      toast.success(`Device ${syncedDevice.deviceId} synced now!`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}

// Delete CGM device for a user
async function deleteCGMDevice(did: number) {
  const res = await fetch(`/api/user/cgm-devices`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did }),
  });
  if (!res.ok) throw new Error("Failed to delete CGM device");
  return res.json();
}

export function useDeleteCGMDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCGMDevice,
    onSuccess: (deletedDevice) => {
      const cacheKey = ["user-cgm-devices"];
      queryClient.setQueryData<CgmDevice[]>(cacheKey, (currentDevices) => {
        if (!currentDevices) return [];
        return currentDevices.filter((device) => device.id !== deletedDevice.id);
      });
      toast.success(`Device ${deletedDevice.deviceId} successfully deleted!`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}