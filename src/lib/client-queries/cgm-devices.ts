import { CgmDevice } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
async function createCGMDevice(device: CgmDevice) {
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
    },
    onError: (error) => {
        console.error("Error creating new cgm devices:", error);
    },
  });
}