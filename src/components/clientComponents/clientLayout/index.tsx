"use client";

import "@ant-design/v5-patch-for-react-19";
import { CSSProperties, ReactNode, useMemo } from "react";
import { App, Layout } from "antd";
import { usePathname } from "next/navigation";
import AuthProvider from "@src/context/auth";
import ErrorBoundary from "@src/components/clientComponents/errorBoundary";
import Breadcrumb from "@src/components/clientComponents/breadcrumb";
import Error from "@src/app/error";
import HeaderPage from "@src/components/clientComponents/headerPage";
import Menu from "@src/components/clientComponents/menu";
import ReloadPageOnNavigationBrowser from "../../clientComponents/reloadPageOnNavigationBrowser";
import { publicRoutes } from "@src/utils/constants";

const ClientLayout = ({ children }: { children: ReactNode; }) => {
  const pathname = usePathname();
  const styleContent = useMemo(() => {
    const landingStyle: CSSProperties = {
      display: "block",
      padding: 20,
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      minHeight: "100%"
    } as const;

    if (publicRoutes.includes(pathname)) {
      return landingStyle;
    }

    return {
      padding: 20
    };
  }, [pathname]);

  return (
    <App>
      <ReloadPageOnNavigationBrowser />
      <AuthProvider>
        <Layout style={{ backgroundColor: "#ECF0F1", height: "86vh" }}>
          <Menu />
          <Breadcrumb />
          <HeaderPage />
          <ErrorBoundary fallback={<Error />}>
            <Layout.Content
              style={styleContent}
            >
              {children}
            </Layout.Content>
          </ErrorBoundary>
        </Layout>
      </AuthProvider>
    </App>
  );
};

export default ClientLayout;