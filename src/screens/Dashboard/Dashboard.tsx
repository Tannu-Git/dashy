import React from "react";
import { DashboardOverviewSection } from "./sections/DashboardOverviewSection/DashboardOverviewSection";
import { Layout } from "../../components/Layout";

export const Dashboard = (): JSX.Element => {
  return (
    <Layout title="Dashboard">
      <DashboardOverviewSection />
    </Layout>
  );
};
