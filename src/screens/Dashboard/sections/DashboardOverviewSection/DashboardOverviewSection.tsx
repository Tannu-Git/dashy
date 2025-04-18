import {
  CalendarIcon,
  FigmaIcon,
  GithubIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  YoutubeIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { Calendar } from "../../../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../components/ui/popover";

export const DashboardOverviewSection = (): JSX.Element => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMetric, setSelectedMetric] = useState("value");

  // Sample data for the chart
  const chartData = [
    { date: "19/12", value: 1000, customers: 1, churned: 0.3, active: 330 },
    { date: "20/12", value: 1200, customers: 1.6, churned: 1.9, active: 470 },
    { date: "21/12", value: 1800, customers: 1.9, churned: 2, active: 520 },
    { date: "22/12", value: 2000, customers: 2.2, churned: 1.65, active: 750 },
    { date: "23/12", value: 1400, customers: 3, churned: 5, active: 980 },
    { date: "24/12", value: 1800, customers: 4, churned: 4, active: 1200 },
    { date: "25/12", value: 1600, customers: 5, churned: 3, active: 1330 },
    { date: "26/12", value: 2200, customers: 3, churned: 2, active: 1337 },
  ];

  // Data for metric cards
  const metricCards = [
    {
      title: "Value",
      value: "€ 43.400",
      trend: 23,
      increasing: true,
      comparison: "vs. €33.418 last period",
      dataKey: "value"
    },
    {
      title: "New customers",
      value: "130",
      trend: 29,
      increasing: true,
      comparison: "vs. 92 last period",
      dataKey: "customers"
    },
    {
      title: "Churned customers",
      value: "5",
      trend: 14,
      increasing: false,
      comparison: "vs. 3 last period",
      dataKey: "churned"
    },
    {
      title: "Active users",
      value: "1337",
      trend: 10,
      increasing: true,
      comparison: "vs. 1199 last period",
      dataKey: "active"
    },
  ];

  // Data for top countries with enhanced metrics
  const topCountries = [
    { 
      country: "US", 
      sales: 233, 
      revenue: "€15,672",
      growth: 23.5,
      profit: "€8,840",
      avgOrderValue: "€67.25",
      status: "increasing"
    },
    { 
      country: "India", 
      sales: 278, 
      revenue: "€33,358",
      growth: 45.2,
      profit: "€18,347",
      avgOrderValue: "€120.00",
      status: "increasing"
    },
    { 
      country: "Brazil", 
      sales: 216, 
      revenue: "€9,759",
      growth: -5.8,
      profit: "€4,879",
      avgOrderValue: "€45.18",
      status: "decreasing"
    },
    { 
      country: "Netherlands", 
      sales: 231, 
      revenue: "€8,548",
      growth: 12.4,
      profit: "€4,274",
      avgOrderValue: "€37.00",
      status: "increasing"
    },
    { 
      country: "Germany", 
      sales: 100, 
      revenue: "€3,414",
      growth: 8.9,
      profit: "€1,707",
      avgOrderValue: "€34.14",
      status: "increasing"
    },
    { 
      country: "France", 
      sales: 52, 
      revenue: "€9,124",
      growth: -2.3,
      profit: "€4,562",
      avgOrderValue: "€175.46",
      status: "decreasing"
    },
    { 
      country: "United Kingdom", 
      sales: 43, 
      revenue: "€7,367",
      growth: 15.7,
      profit: "€3,683",
      avgOrderValue: "€171.32",
      status: "increasing"
    },
  ];

  // Data for activity feed
  const activityItems = [
    { name: "Helmut Magomedov", action: "signed up", time: "3 hr. ago" },
    { name: "Dariusz Thomas", action: "signed up", time: "yesterday" },
    { name: "Christian Amadi", action: "upgraded to Pro", time: "yesterday" },
    { name: "Kanchana Nowak", action: "signed up", time: "yesterday" },
    { name: "Aisha Njuguna", action: "cancelled subscription", time: "2 days ago" },
    { name: "Tomiko Njeri", action: "signed up", time: "2 days ago" },
    { name: "John Doe", action: "upgraded to Pro", time: "3 days ago" },
  ];

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      setSelectedDate(date);
    }
  };

  const handleMetricSelect = (dataKey: string) => {
    setSelectedMetric(dataKey);
  };

  const socialLinks = {
    youtube: "https://youtube.com",
    github: "https://github.com",
    figma: "https://figma.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    shopify: "https://shopify.com"
  };

  // Calendar events data
  const events = [
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 25), title: "Team Meeting", type: "meeting" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 27), title: "Project Review", type: "review" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 28), title: "Client Call", type: "call" }
  ];

  return (
    <div className="flex flex-col items-start relative flex-1 self-stretch grow">
      {/* Header section */}
      <header className="flex flex-col items-start p-5 relative self-stretch w-full flex-[0_0_auto] bg-background border-b border-border">
        <div className="flex items-center justify-between relative self-stretch w-full">
          <h1 className="font-semibold text-foreground text-[13px] leading-5 whitespace-nowrap">
            Dashboard
          </h1>

          <div className="inline-flex items-center gap-[15px]">
            <Button
              variant="ghost"
              size="icon"
              className="w-[34px] h-[34px] p-0 hover:bg-gray-100 transition-all duration-200 hover:scale-110 text-gray-600 hover:text-gray-900"
              onClick={() => window.open(socialLinks.youtube, '_blank')}
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-[34px] h-[34px] p-0 hover:bg-gray-100 transition-all duration-200 hover:scale-110 text-gray-600 hover:text-gray-900"
              onClick={() => window.open(socialLinks.github, '_blank')}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-[34px] h-[34px] p-0 hover:bg-gray-100 transition-all duration-200 hover:scale-110 text-gray-600 hover:text-gray-900"
              onClick={() => window.open(socialLinks.figma, '_blank')}
            >
              <FigmaIcon className="w-3.5 h-3.5" />
            </Button>

            <Button 
              className="h-[34px] px-2.5 py-[5px] bg-[#3c3c3c] rounded-[10px] hover:bg-[#3c3c3c]/90 transition-all duration-200 hover:scale-105 hover:shadow-md"
              onClick={() => window.open('/pro', '_blank')}
            >
              <span className="font-semibold text-white text-[13px] leading-5 whitespace-nowrap">
                Buy Pro
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Time period selector */}
      <div className="flex flex-col items-start p-5 relative self-stretch w-full bg-background border-b border-border">
        <div className="flex items-center relative self-stretch w-full">
          <div className="flex items-center gap-2.5">
            <ToggleGroup type="single" value={selectedPeriod} onValueChange={handlePeriodChange}>
              <ToggleGroupItem
                value="1d"
                className="h-[37px] rounded-l-[10px] rounded-r-none border border-border font-medium text-[13px] transition-all duration-200 hover:bg-muted"
              >
                1d
              </ToggleGroupItem>
              <ToggleGroupItem
                value="3d"
                className="h-[37px] rounded-none border border-border font-medium text-[13px] transition-all duration-200 hover:bg-muted"
              >
                3d
              </ToggleGroupItem>
              <ToggleGroupItem
                value="7d"
                className="h-[37px] rounded-none border border-border font-medium text-[13px] transition-all duration-200 hover:bg-muted"
              >
                7d
              </ToggleGroupItem>
              <ToggleGroupItem
                value="30d"
                className="h-[37px] rounded-none border border-border font-medium text-[13px] transition-all duration-200 hover:bg-muted"
              >
                30d
              </ToggleGroupItem>
              <ToggleGroupItem
                value="custom"
                className="h-[37px] rounded-r-[10px] rounded-l-none border border-border font-medium text-[13px] transition-all duration-200 hover:bg-muted"
              >
                Custom
              </ToggleGroupItem>
            </ToggleGroup>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 flex items-center gap-2.5 rounded-[10px] border border-border transition-all duration-200 hover:bg-muted hover:scale-105"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span className="font-medium text-foreground text-[13px] leading-5 whitespace-nowrap">
                    {format(selectedDate, 'MM/dd/yyyy')}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  className="rounded-md"
                  modifiers={{
                    event: (date) => events.some(event => 
                      date && 
                      event.date && 
                      date.toDateString() === event.date.toDateString()
                    )
                  }}
                  modifiersStyles={{
                    event: {
                      fontWeight: 'bold',
                      color: '#3c3c3c',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px'
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Main content area with metrics and charts */}
      <div className="flex-1 w-full grow overflow-y-auto overscroll-none relative self-stretch bg-background border-b border-border">
        <div className="p-4 sm:p-6 lg:p-10">
          {/* Metric cards */}
          <div className="flex flex-wrap gap-0">
            {metricCards.map((card, index) => (
              <Card
                key={index}
                className={`flex-1 min-w-[200px] cursor-pointer transition-all duration-300 hover:bg-muted hover:scale-[1.02] hover:shadow-md ${
                  selectedMetric === card.dataKey ? 'bg-muted scale-[1.02] shadow-md' : ''
                } ${
                  index === 0 
                    ? 'rounded-l-[10px] rounded-r-none' 
                    : index === metricCards.length - 1
                      ? 'rounded-r-[10px] rounded-l-none'
                      : 'rounded-none'
                } border-t border-r border-b border-border ${
                  index !== 0 ? 'border-l-0' : 'border-l'
                }`}
                onClick={() => handleMetricSelect(card.dataKey)}
              >
                <CardContent className="flex flex-col items-start gap-2.5 p-[15px]">
                  <div className="text-muted-foreground font-medium text-[13px] leading-5 whitespace-nowrap">
                    {card.title}
                  </div>
                  <div className="inline-flex items-center gap-2.5">
                    <div className="font-semibold text-foreground text-2xl leading-5 whitespace-nowrap transition-all duration-300">
                      {card.value}
                    </div>
                    <div className="inline-flex items-center gap-[5px] transition-all duration-300">
                      {card.increasing ? (
                        <TrendingUpIcon className="w-[11px] h-[11px] text-green-500" />
                      ) : (
                        <TrendingDownIcon className="w-[11px] h-[11px] text-red-500" />
                      )}
                      <div className={`font-medium text-[10px] leading-5 whitespace-nowrap ${
                        card.increasing ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {card.trend}%
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground font-medium text-[13px] leading-5 whitespace-nowrap">
                    {card.comparison}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Single Chart */}
          <Card className="w-full border border-border rounded-b-[10px] mt-0 transition-all duration-300 hover:shadow-lg bg-background">
            <CardContent className="p-5">
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '10px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="hsl(var(--primary))"
                      fill="url(#colorGradient)"
                      animationDuration={1000}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bottom section with three cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 mt-6">
            {/* Top countries card */}
          <Card className="border border-border rounded-[10px] transition-all duration-300 hover:shadow-lg md:col-span-2">
              <CardContent className="p-0">
                <div className="p-3.5 font-semibold text-foreground text-[13px] leading-5">
                  Top Countries
                </div>

                <div className="p-[15px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[13px] h-8 transition-all duration-200 hover:bg-muted hover:scale-105"
                      >
                        Revenue
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[13px] h-8 transition-all duration-200 hover:bg-muted hover:scale-105"
                      >
                        Orders
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[13px] h-8 transition-all duration-200 hover:bg-muted hover:scale-105"
                      >
                        Growth
                      </Button>
                    </div>
                  </div>
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent -mx-4 sm:mx-0">
                    <table className="w-full min-w-[640px] border-separate border-spacing-0">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-medium text-foreground text-[11px]">Countries</th>
                          <th className="text-center py-2 font-medium text-foreground text-[11px]">Sales</th>
                          <th className="text-left py-2 font-medium text-foreground text-[11px]">Revenue</th>
                          <th className="text-right py-2 font-medium text-foreground text-[11px]">Growth</th>
                          <th className="text-right py-2 font-medium text-foreground text-[11px]">Profit</th>
                          <th className="text-right py-2 font-medium text-foreground text-[11px]">Avg. Order</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topCountries.map((country, index) => (
                          <tr 
                            key={index} 
                            className="border-b border-border transition-all duration-200 hover:bg-muted cursor-pointer group"
                          >
                            <td className="py-2 font-normal text-foreground text-[13px] transition-colors duration-200 group-hover:text-primary">
                              {country.country}
                            </td>
                            <td className="py-2 text-center font-normal text-foreground text-[13px]">
                              {country.sales}
                            </td>
                            <td className="py-2 font-normal text-foreground text-[13px]">
                              {country.revenue}
                            </td>
                            <td className={`py-2 text-right font-normal text-[13px] ${
                              country.status === 'increasing' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {country.growth > 0 ? '+' : ''}{country.growth}%
                            </td>
                            <td className="py-2 text-right font-normal text-foreground text-[13px]">
                              {country.profit}
                            </td>
                            <td className="py-2 text-right font-normal text-foreground text-[13px]">
                              {country.avgOrderValue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Insights Card - Replacing Calendar */}
            <Card className="border border-border rounded-[10px] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="p-3.5 font-semibold text-foreground text-[13px] leading-5 border-b border-border">
                  Sales Insights
                </div>
                <div className="p-3 sm:p-[15px]">
                  {/* Sales Performance Summary */}
                  <div className="space-y-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-[11px] text-muted-foreground">Conversion Rate</div>
                        <div className="text-[18px] font-semibold text-foreground">2.4%</div>
                        <div className="text-[11px] text-green-500">↑ 0.3%</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-[11px] text-muted-foreground">Avg. Order Value</div>
                        <div className="text-[18px] font-semibold text-foreground">€67.54</div>
                        <div className="text-[11px] text-green-500">↑ 2.1%</div>
                      </div>
                    </div>
            
                    {/* Top Products */}
                    <div className="mt-4">
                      <div className="text-[13px] font-medium mb-2">Top Products</div>
                      <div className="space-y-2">
                        {[
                          { name: "Product A", sales: 145, revenue: "€4,350" },
                          { name: "Product B", sales: 132, revenue: "€3,960" },
                          { name: "Product C", sales: 109, revenue: "€3,270" }
                        ].map((product, index) => (
                          <div key={index} 
                            className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-all duration-200 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                              <div className="text-[13px] font-medium text-foreground">{product.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[13px] font-medium text-foreground">{product.revenue}</div>
                              <div className="text-[11px] text-muted-foreground">{product.sales} sales</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
            
                    {/* Quick Stats */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="text-[13px] font-medium mb-2 text-foreground">Quick Stats</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-muted-foreground">Daily Sales</span>
                          <span className="font-medium text-foreground">€1,247</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-muted-foreground">Items Sold</span>
                          <span className="font-medium text-foreground">37 units</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-muted-foreground">Active Customers</span>
                          <span className="font-medium text-foreground">189</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
