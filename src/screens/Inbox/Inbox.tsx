import React from "react";
import { InboxSection } from "./sections/InboxSection";
import { Layout } from "../../components/Layout";

export const Inbox = (): JSX.Element => {
  return (
    <Layout title="Inbox">
      <InboxSection />
    </Layout>
  );
};
