"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Tabs defaultValue={theme}>
      <TabsList  className="border">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon
            className={
              theme === "dark"
                ? "rotate-90 transition-all"
                : "rotate-0 transition-all"
            }
          />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <DesktopIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;
