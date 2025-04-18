import { useState } from "react";
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  SlidersHorizontalIcon,
  LayoutGridIcon,
  ListIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Badge } from "../../components/ui/badge";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Inbox } from "../Inbox/Inbox";
import { Layout } from "../../components/Layout";

const tags = [
  { id: 1, name: "Creative", count: 13, contacts: ["Kiyoshi Werner", "Ella Patel", "Hugo Garcia"] },
  { id: 2, name: "DevOps", count: 9, contacts: ["Eelco Wiersma", "Sophia Chen"] },
  { id: 3, name: "No tag", count: 51, contacts: ["Somkhit Gu"] },
];

const contacts = [
  {
    id: 1,
    name: "Kiyoshi Werner",
    email: "kiyoshi_werner@orange.info",
    role: "Customer",
    tags: ["Creative"]
  },
  {
    id: 2,
    name: "Eelco Wiersma",
    email: "eelco.wiersma@cube.com",
    role: "Customer",
    tags: ["DevOps"]
  },
  {
    id: 3,
    name: "Ella Patel",
    email: "ella_patel@blue.info",
    role: "User",
    tags: ["Creative"]
  },
  {
    id: 4,
    name: "Hugo Garcia",
    email: "hugo_garcia@yellow.info",
    role: "Admin",
    tags: ["Creative"]
  },
  {
    id: 5,
    name: "Sophia Chen",
    email: "sophia.chen@octa.com",
    role: "Designer",
    tags: ["DevOps"]
  },
  {
    id: 6,
    name: "Somkhit Gu",
    email: "somkhitgu462@me.io",
    role: "Customer",
    tags: ["No tag"]
  },
];

export const Contacts = (): JSX.Element => {
  return (
    <Layout title="Contacts">
      <ContactsSection />
    </Layout>
  );
};

const ContactsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-5 py-5 border-b border-border">
        <h1 className="text-[13px] font-semibold leading-5">Contacts</h1>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-[15px]">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c4c4c4] w-3.5 h-3.5" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 h-[34px] text-[13px] border-input focus:border-border w-full md:min-w-[328px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="h-[34px] px-2.5 py-[5px] bg-[#3c3c3c] hover:bg-[#3c3c3c]/90 rounded-[10px] text-[13px] font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md group">
            <PlusIcon className="w-3.5 h-3.5 mr-2 transition-transform duration-200 group-hover:scale-110" />
            <span>Add person</span>
          </Button>
        </div>
      </header>

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 md:pb-0">
          <ToggleGroup type="single" value="all" className="border border-border rounded-[10px]">
            <ToggleGroupItem value="all" className="h-[35px] px-[10px] text-[13px] font-medium data-[state=on]:bg-muted rounded-l-[10px] transition-all duration-200 hover:bg-muted">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="leads" className="h-[35px] px-[10px] text-[13px] font-medium data-[state=on]:bg-muted border-x border-border transition-all duration-200 hover:bg-muted">
              Leads
            </ToggleGroupItem>
            <ToggleGroupItem value="customers" className="h-[35px] px-[10px] text-[13px] font-medium data-[state=on]:bg-muted rounded-r-[10px] transition-all duration-200 hover:bg-muted">
              Customers
            </ToggleGroupItem>
          </ToggleGroup>

          <Button variant="outline" className="h-[34px] border-border text-[13px] font-medium transition-all duration-200 hover:scale-105 hover:bg-muted group shrink-0">
            <FilterIcon className="w-3.5 h-3.5 mr-2 transition-transform duration-200 group-hover:scale-110" />
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          <ToggleGroup
            type="single"
            value={viewType}
            onValueChange={(value) => value && setViewType(value as "grid" | "list")}
            className="border border-border rounded-[10px]"
          >
            <ToggleGroupItem value="list" className="h-[34px] w-[34px] p-2.5 data-[state=on]:bg-muted rounded-l-[10px] transition-all duration-200 hover:bg-muted">
              <ListIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" className="h-[34px] w-[34px] p-2.5 data-[state=on]:bg-muted rounded-r-[10px] transition-all duration-200 hover:bg-muted">
              <LayoutGridIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button variant="outline" className="h-[34px] border-border text-[13px] font-medium transition-all duration-200 hover:scale-105 hover:bg-muted group">
            <SlidersHorizontalIcon className="w-3.5 h-3.5 mr-2 transition-transform duration-200 group-hover:scale-110" />
            Display
          </Button>
        </div>
      </div>

      {/* Contact Tags and Lists */}
      <div className="flex-1 p-4 md:p-10 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {tags.map((tag) => (
            <div key={tag.id} className="flex flex-col gap-[15px]">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5 group">
                  <div className="w-2 h-2 bg-foreground rounded-full transition-transform duration-200 group-hover:scale-125" />
                  <span className="text-[13px] font-medium leading-5">{tag.name} {tag.count}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 hover:bg-muted">
                  <MoreVerticalIcon className="w-3.5 h-3.5" />
                </Button>
              </div>
              
              <div className="bg-transparent rounded-[25px] space-y-4">
                {contacts.filter(contact => contact.tags.includes(tag.name)).map((contact) => (
                  <div
                    key={contact.id}
                    className="p-[15px] bg-card border border-border rounded-[15px] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer group"
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-foreground rounded-full transition-transform duration-200 group-hover:scale-125" />
                        <div className="w-2 h-2 border-2 border-black rounded-full transition-transform duration-200 group-hover:scale-125" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[13px] font-medium leading-5 transition-colors duration-200 group-hover:text-primary">{contact.name}</h3>
                      <p className="text-[13px] leading-5 text-[#525252] break-all">{contact.email}</p>
                      <Badge 
                        variant="outline" 
                        className="mt-2 h-6 px-2.5 py-0 text-[13px] leading-5 bg-muted text-muted-foreground border-none rounded-[15px] transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        {contact.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
