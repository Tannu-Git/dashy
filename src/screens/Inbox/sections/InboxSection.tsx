import React, { useState } from "react";
import {
  ArchiveIcon,
  ChevronDownIcon,
  FigmaIcon,
  FolderIcon,
  GithubIcon,
  InboxIcon,
  MailIcon,
  MenuIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  YoutubeIcon,
  FileEditIcon,
  ClockIcon,
  XIcon,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import type { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  time: string;
  avatar: string;
  unread: boolean;
  starred: boolean;
  category: string;
  hasAttachment: boolean;
  labels: string[];
}

interface Folder {
  icon: React.ReactNode;
  name: string;
  count: number;
}

interface Label {
  name: string;
  color: string;
}

const emails: Email[] = [
  {
    id: 1,
    from: "John Doe",
    subject: "New Project Proposal",
    preview: "Hi, I wanted to discuss the new project proposals for Q2. I've attached the detailed documents for your review...",
    time: "10:30 AM",
    avatar: "/avatars/john.jpg",
    unread: true,
    starred: false,
    category: "inbox",
    hasAttachment: true,
    labels: ["work", "important"]
  },
  {
    id: 2,
    from: "Jane Smith",
    subject: "Meeting Notes - Product Review",
    preview: "Here are the notes from today's product review meeting. Key points discussed: 1. Feature roadmap...",
    time: "Yesterday",
    avatar: "/avatars/jane.jpg",
    unread: false,
    starred: true,
    category: "inbox",
    hasAttachment: false,
    labels: ["product"]
  },
  {
    id: 3,
    from: "Marketing Team",
    subject: "Q1 Marketing Report Draft",
    preview: "Please review the attached Q1 marketing performance report draft. Highlights include...",
    time: "Mar 25",
    avatar: "",
    unread: false,
    starred: false,
    category: "drafts",
    hasAttachment: true,
    labels: ["marketing"]
  },
  {
    id: 4,
    from: "David Wilson",
    subject: "Re: Design Review Feedback",
    preview: "Thanks for the detailed feedback. I'll incorporate these changes in the next iteration...",
    time: "Mar 24",
    avatar: "/avatars/david.jpg",
    unread: false,
    starred: true,
    category: "sent",
    hasAttachment: false,
    labels: ["design"]
  },
  {
    id: 5,
    from: "Sarah Johnson",
    subject: "Weekly Team Update",
    preview: "Here's our weekly progress update: 1. Completed the user authentication feature...",
    time: "Mar 23",
    avatar: "/avatars/sarah.jpg",
    unread: false,
    starred: false,
    category: "sent",
    hasAttachment: true,
    labels: ["team"]
  },
  {
    id: 6,
    from: "Client Newsletter",
    subject: "April Newsletter Draft",
    preview: "Draft for the April client newsletter. Please review the content and suggest any changes...",
    time: "Mar 22",
    avatar: "",
    unread: false,
    starred: false,
    category: "drafts",
    hasAttachment: false,
    labels: ["newsletter"]
  }
];

const folders: Folder[] = [
  { icon: <InboxIcon className="w-4 h-4" />, name: "Inbox", count: 12 },
  { icon: <SendIcon className="w-4 h-4" />, name: "Sent", count: 24 },
  { icon: <FileEditIcon className="w-4 h-4" />, name: "Drafts", count: 8 },
  { icon: <ArchiveIcon className="w-4 h-4" />, name: "Archive", count: 24 },
  { icon: <StarIcon className="w-4 h-4" />, name: "Starred", count: 6 },
  { icon: <ClockIcon className="w-4 h-4" />, name: "Snoozed", count: 2 },
  { icon: <TrashIcon className="w-4 h-4" />, name: "Trash", count: 1 },
];

const labels: Label[] = [
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Important", color: "bg-red-500" },
  { name: "Design", color: "bg-purple-500" },
  { name: "Marketing", color: "bg-yellow-500" },
  { name: "Product", color: "bg-pink-500" },
];

export const InboxSection = (): JSX.Element => {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredEmails = emails.filter(email => {
    if (selectedFolder.toLowerCase() === email.category) return true;
    if (selectedFolder === "Starred" && email.starred) return true;
    if (selectedFolder === "Inbox" && email.category === "inbox") return true;
    return false;
  });

  const EmailFolders = () => (
    <div className="flex flex-col h-full">
      <Button className="w-full h-9 xs:h-[44px] sm:h-[34px] mb-3 xs:mb-4 transition-all duration-200 hover:scale-105 hover:shadow-md bg-primary hover:bg-primary/90 active:scale-95">
        <MailIcon className="w-4 h-4 mr-2" />
        Compose
      </Button>

      <nav className="space-y-1">
        {folders.map((folder) => (
          <button
            key={folder.name}
            className={`flex items-center justify-between w-full h-9 xs:h-[44px] sm:h-[34px] px-2.5 xs:px-3 py-2 text-sm rounded-lg transition-all duration-200 group active:scale-95 ${
              selectedFolder === folder.name
                ? "bg-muted text-foreground scale-[1.02]"
                : "text-muted-foreground hover:bg-muted hover:scale-[1.02]"
            }`}
            onClick={() => {
              setSelectedFolder(folder.name);
              setIsMenuOpen(false);
            }}
          >
            <div className="flex items-center">
              <div className="transition-transform duration-200 group-hover:scale-110">
                {folder.icon}
              </div>
              <span className="ml-3">{folder.name}</span>
            </div>
            {folder.count > 0 && (
              <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs transition-transform duration-200 group-hover:scale-110">
                {folder.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Labels</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 transition-transform duration-200 hover:scale-110 active:scale-95">
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </div>
        {labels.map((label) => (
          <div
            key={label.name}
            className="flex items-center h-9 xs:h-[44px] sm:h-[34px] px-2.5 xs:px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-all duration-200 group hover:scale-[1.02] active:scale-95"
          >
            <div className={`w-2 h-2 rounded-full ${label.color} mr-3 transition-transform duration-200 group-hover:scale-125`} />
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between p-3 xs:p-4 sm:p-5 border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 xs:gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 xs:h-[44px] xs:w-[44px] sm:h-[34px] sm:w-[34px] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95"
              >
                <MenuIcon className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-4">
              <EmailFolders />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg xs:text-xl font-semibold">{selectedFolder}</h1>
        </div>
        <div className="flex items-center gap-1.5 xs:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 xs:h-[44px] xs:w-[44px] sm:h-[34px] sm:w-[34px] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95 hidden xs:flex"
            onClick={() => window.open("https://youtube.com", "_blank")}
          >
            <YoutubeIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 xs:h-[44px] xs:w-[44px] sm:h-[34px] sm:w-[34px] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95 hidden xs:flex"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <GithubIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 xs:h-[44px] xs:w-[44px] sm:h-[34px] sm:w-[34px] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95 hidden xs:flex"
            onClick={() => window.open("https://figma.com", "_blank")}
          >
            <FigmaIcon className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile, shown on desktop */}
        <aside className="hidden lg:block w-[280px] min-w-[280px] shrink-0 border-r border-border p-4 overflow-y-auto touch-scroll">
          {/* Email Folders */}
          <EmailFolders />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 relative">
            {/* Search and filters */}
            <div className="p-3 xs:p-4 border-b border-border relative  xs:top-[13px] sm:top-[13px] z-20 bg-background lg:w-[calc(100%)] w-full right-0">
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 xs:gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search emails..."
                    className="pl-9 xs:pl-10 h-9 xs:h-[44px] sm:h-[34px] transition-all duration-200 focus:border-primary focus:ring-primary text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 xs:h-[44px] xs:w-[44px] sm:h-[34px] sm:w-[34px] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95">
                    <FolderIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9 xs:h-[44px] xs:w-[44px] sm:h-[34px] sm:w-[34px] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95">
                    <TagIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Email list */}
            <div className="flex-1 overflow-auto touch-scroll divide-y divide-border mt-[20px] xs:mt-[20px] sm:mt-[20px]">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`relative flex items-start gap-3 xs:gap-4 p-3 xs:p-4 hover:bg-muted cursor-pointer transition-all duration-200 group active:scale-[0.99] ${
                  email.unread ? "bg-muted/60" : ""
                }`}
              >
                <Avatar className="w-9 h-9 xs:w-10 xs:h-10 transition-transform duration-200 hover:scale-110 shrink-0 mt-0.5">
                  <AvatarImage src={email.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {email.from.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={`text-sm font-medium transition-colors duration-200 truncate group-hover:text-primary ${email.unread ? "font-semibold" : ""}`}>
                      {email.from}
                    </h3>
                    <span className="text-xs text-muted-foreground/80 whitespace-nowrap">{email.time}</span>
                  </div>
                  <p className={`text-sm truncate ${email.unread ? "text-foreground" : "text-muted-foreground/90"}`}>{email.subject}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground/75 line-clamp-1 flex-1">{email.preview}</p>
                    {email.hasAttachment && (
                      <PaperclipIcon className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    {email.labels.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {email.labels.slice(0, 2).map((label) => (
                          <span
                            key={label}
                            className="px-1.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 xs:gap-2 shrink-0 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 xs:h-9 xs:w-9 sm:h-8 sm:w-8 p-0 transition-all duration-200 hover:scale-110 active:scale-95 ${
                      email.starred ? "text-yellow-400 hover:text-yellow-500" : "text-muted-foreground hover:text-yellow-400"
                    }`}
                  >
                    <StarIcon className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 xs:h-9 xs:w-9 sm:h-8 sm:w-8 p-0 transition-all duration-200 hover:scale-110 active:scale-95 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                      <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted">
                        Mark as {email.unread ? "read" : "unread"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted">
                        Move to archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 transition-colors duration-200 hover:bg-red-50">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
