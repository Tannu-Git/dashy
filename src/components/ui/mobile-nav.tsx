import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./button";
import { SideMenuSection } from "../../screens/Dashboard/sections/SideMenuSection/SideMenuSection";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./sheet";

interface MobileNavProps {
  onOpenChange?: (open: boolean) => void;
}

type CustomEvent = {
  target: EventTarget | null;
}

export function MobileNav({ onOpenChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault();
  };

  const handlePointerDownOutside = (event: CustomEvent) => {
    // Only close if clicking outside the sheet
    if (event.target instanceof Element) {
      const isSheet = event.target.closest('[role="dialog"]');
      if (!isSheet) {
        setIsOpen(false);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <Menu className="h-5 w-5 transition-transform duration-200 ease-spring" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="p-0 w-[280px] flex flex-col backdrop-blur-xl overflow-hidden"
        onOpenAutoFocus={handleOpenAutoFocus}
        onPointerDownOutside={handlePointerDownOutside}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-none touch-pan-y scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <SideMenuSection />
        </div>
      </SheetContent>
    </Sheet>
  );
}
