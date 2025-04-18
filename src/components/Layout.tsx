import React from "react";
import { SideMenuSection } from "../screens/Dashboard/sections/SideMenuSection/SideMenuSection";
import { MobileNav } from "./ui/mobile-nav";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const Layout = ({ children, title }: LayoutProps): JSX.Element => {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-background overflow-hidden overscroll-none">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b md:hidden sticky top-0 z-10 bg-background/95 backdrop-blur touch-action-manipulation">
        <MobileNav />
        <span className="text-lg font-semibold">{title}</span>
      </div>

      {/* Sidebar - hidden on mobile, visible on desktop */}
      <aside className="hidden md:block h-screen w-[280px] min-w-[280px] shrink-0 border-r border-border sticky top-0 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar momentum-scroll touch-scroll">
          <SideMenuSection />
        </div>
      </aside>

      {/* Main Content */}
      <section 
        className="flex-1 h-[calc(100dvh-60px)] md:h-screen overflow-y-auto overflow-x-hidden custom-scrollbar touch-scroll momentum-scroll touch-action-manipulation"
        style={{
          scrollbarGutter: 'stable',
        }}
      >
        {children}
      </section>
    </main>
  );
};
