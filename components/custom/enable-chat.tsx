"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function ChatSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false || pathname === "/ai");

  const handleChange = () => {
    const shouldRedirect = !enabled && pathname !== "/ai";
    setEnabled(shouldRedirect);

    if (shouldRedirect) {
      console.log("rerouting to ai");
      router.push("/ai");
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (pathname !== "/ai") {
      setEnabled(false);
    }
  
  }, [pathname])

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id="airplane-mode"
        checked={enabled || pathname === "/ai"}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="airplane-mode" className="text-xs font-medium">Enable AI</Label>
    </div>
  );
}
