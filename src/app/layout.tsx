import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import { ReactNode, Suspense } from "react";
import { ConfigProvider } from "antd";
import ClientLayout from "@src/components/clientLayout";
import Header from "@src/components/landingPage/header";
import FullLoader from "@src/components/fullLoader";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@src/components/landingPage/footer";

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            //colores globales
            theme={{
              token: {
                colorPrimary: "#3498DB",
                colorSuccess: "#27AE60",
                colorText: "#1F2937",
                colorLink: "#2563EB",
                green: "#27AE60"
              }
            }}
          >
            <Suspense fallback={<FullLoader />}>
              <Header />
              <ClientLayout>
                {children}
              </ClientLayout>
              <Footer />
            </Suspense>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html >
  );
}