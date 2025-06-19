"use client";

import { ReactNode } from "react";
import AuthProvider from "@src/context/auth";
import ErrorBoundary from "@src/components/clientComponents/errorBoundary";
import Breadcrumb from "@src/components/clientComponents/breadcrumb";
import Error from "@src/app/error";
import HeaderPage from "@src/components/clientComponents/headerPage";
import Menu from "@src/components/clientComponents/menu";
import { App, Layout } from "antd";
import { usePathname } from "next/navigation";
import ReloadPageOnNavigationBrowser from "../../clientComponents/reloadPageOnNavigationBrowser";

const ClientLayout = ({ children }: { children: ReactNode; }) => {
  const pathname = usePathname();

  return (
    <App>
      <ReloadPageOnNavigationBrowser />
      <AuthProvider>
        <Layout style={{ backgroundColor: "#ECF0F1", height: "86vh" }}>
          <Menu />
          <div style={{
            display: "block",
            padding: pathname === "/" ? 0 : 20,
            width: "100%",
          }}>
            <Breadcrumb />
            <HeaderPage />
            <ErrorBoundary fallback={<Error />}>
              <Layout.Content>
                {children}
              </Layout.Content>
            </ErrorBoundary>
          </div>
        </Layout>
      </AuthProvider>
    </App>
  );
};

export default ClientLayout;