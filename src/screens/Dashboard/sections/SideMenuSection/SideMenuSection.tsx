import {
  ChevronUpIcon,
  HelpCircleIcon,
  MessagesSquareIcon,
  PanelTopIcon,
  PlusIcon,
  SearchIcon,
  Users2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { ThemeToggle } from "../../../../components/ui/theme-toggle";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../components/ui/collapsible";
import { Input } from "../../../../components/ui/input";

export const SideMenuSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  
  const channels = [
    { name: "All", count: 210 },
    { name: "Instagram", count: 83 },
    { name: "Shopify", count: 12 },
    { name: "Facebook", count: 23 },
  ];

  const handleContactClick = () => {
    navigate('/contacts');
  };

  return (
    <aside className="flex flex-col p-5 border-r border-border bg-background h-full w-[280px] min-w-[280px] overflow-hidden">
      <div className="flex flex-col gap-5 w-full h-full overflow-y-auto custom-scrollbar touch-scroll momentum-scroll">
        {/* Header with logo and avatar */}
        <div className="flex items-center justify-between w-full sticky top-0 z-10 bg-background/95 backdrop-blur pb-2">
          <div className="inline-flex h-[44px] sm:h-[34px] items-center gap-1.5 pl-[5px] pr-2.5 py-[5px] bg-background rounded-[10px] transition-all duration-200 hover:scale-105 hover:bg-muted active:scale-95">
            <div className="relative w-[17px] h-[17px]">
              <img
                className="absolute w-[11px] h-[11px] top-0.5 left-0.5"
                alt="Union"
                src="/union.svg"
              />
            </div>
            <div className="inline-flex h-4 justify-center items-center">
              <img
                className="w-[35.55px] h-[14.8px]"
                alt="Label"
                src="/label.png"
              />
            </div>
          </div>

          <Avatar className="w-8 h-8 sm:w-6 sm:h-6 transition-all duration-200 hover:scale-110 cursor-pointer hover:ring-2 hover:ring-primary/20">
            <AvatarFallback className="text-[11px] sm:text-[9px] border border-solid border-border">
              MF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Search bar */}
        <div className="flex h-[44px] sm:h-9 items-center gap-2.5 px-2.5 py-[5px] bg-background rounded-[10px] border border-solid border-border transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <SearchIcon className="w-3.5 h-3.5 text-muted-foreground" />
          <Input
            className="h-full sm:h-6 border-0 p-0 shadow-none text-[13px] placeholder:text-muted-foreground transition-colors duration-200 focus:ring-0"
            placeholder="Search"
          />
          <div className="flex w-5 h-5 items-center justify-center bg-muted rounded-[5px]">
            <span className="text-[13px] font-medium">/</span>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex flex-col gap-[5px] w-full">
          {[
            { icon: <PanelTopIcon className="w-3.5 h-3.5" />, name: "Dashboard", path: "/dashboard" },
            { icon: <MessagesSquareIcon className="w-3.5 h-3.5" />, name: "Inbox", path: "/inbox", badge: "3" },
            { icon: <Users2Icon className="w-3.5 h-3.5" />, name: "Contacts", path: "/contacts" }
          ].map((item) => (
            <div 
              key={item.name}
              className={`flex h-[44px] sm:h-[34px] items-center gap-2.5 pl-2.5 pr-[15px] py-[5px] rounded-[10px] cursor-pointer transition-all duration-200 active:scale-95 group ${
                location.pathname === item.path ? 'bg-muted text-primary' : 'bg-background hover:bg-muted/50 hover:text-primary'
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className="transition-transform duration-200 group-hover:scale-110">{item.icon}</div>
              <span className="flex-1 text-[13px] leading-5">{item.name}</span>
              {item.badge && (
                <Badge className="bg-transparent text-foreground font-semibold text-[13px] p-0 transition-all duration-200 group-hover:scale-110 group-hover:text-primary">
                  {item.badge}
                </Badge>
              )}
            </div>
          ))}
        </nav>

        {/* Channels section */}
        <Collapsible 
          className="w-full rounded-[10px]" 
          open={isChannelsOpen}
          onOpenChange={setIsChannelsOpen}
        >
          <CollapsibleTrigger className="flex h-[44px] sm:h-[34px] items-center justify-between w-full px-2.5 py-0 bg-background rounded-[10px] transition-all duration-200 hover:bg-muted/50 active:scale-95 group">
            <span className="text-[13px] text-muted-foreground group-hover:text-primary">Channels</span>
            <div className="w-5 h-5 flex items-center justify-center">
              <ChevronUpIcon className={`w-3.5 h-3.5 transition-all duration-200 transform group-hover:text-primary ${isChannelsOpen ? '' : 'rotate-180'}`} />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col gap-[5px] mt-2.5 transition-all duration-200">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="h-[44px] sm:h-[34px] flex items-center justify-between pl-1 pr-[15px] cursor-pointer hover:bg-muted/50 rounded-[10px] transition-all duration-200 active:scale-95 group"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-foreground rounded-[5px] transition-all duration-200 group-hover:scale-125 group-hover:bg-primary" />
                </div>
                <span className="flex-1 text-[13px] font-normal leading-5 transition-colors duration-200 group-hover:text-primary">
                  {channel.name}
                </span>
                <span className="text-[13px] font-normal leading-5 transition-all duration-200 group-hover:scale-110 group-hover:text-primary">
                  {channel.count}
                </span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Bottom actions */}
        <div className="flex flex-col gap-[5px] w-full mt-auto pt-5">
          <div className="flex h-[44px] sm:h-[34px] items-center gap-2.5 pl-2.5 pr-[15px] py-[5px] bg-background rounded-[10px] transition-all duration-200">
            <ThemeToggle />
            <span className="flex-1 text-[13px] leading-5">Toggle theme</span>
          </div>
          <div className="flex h-[44px] sm:h-[34px] items-center gap-2.5 pl-2.5 pr-[15px] py-[5px] bg-background rounded-[10px] cursor-pointer hover:bg-muted/50 transition-all duration-200 active:scale-95 group">
            <PlusIcon className="w-3.5 h-3.5 transition-all duration-200 group-hover:scale-110 group-hover:text-primary" />
            <span className="flex-1 text-[13px] leading-5 transition-colors duration-200 group-hover:text-primary">Invite people</span>
          </div>

          <div className="flex h-[44px] sm:h-[34px] items-center gap-2.5 pl-2.5 pr-[15px] py-[5px] bg-background rounded-[10px] cursor-pointer hover:bg-muted/50 transition-all duration-200 active:scale-95 group">
            <HelpCircleIcon className="w-3.5 h-3.5 transition-all duration-200 group-hover:scale-110 group-hover:text-primary" />
            <span className="flex-1 text-[13px] leading-5 transition-colors duration-200 group-hover:text-primary">
              Help and support
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
