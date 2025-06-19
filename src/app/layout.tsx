import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import { ReactNode, Suspense } from "react";
import { ConfigProvider } from "antd";
import ClientLayout from "@src/components/clientComponents/clientLayout";
import Header from "@src/components/serverComponents/landingPage/header";
import FullLoader from "@src/components/clientComponents/fullLoader";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@src/components/serverComponents/landingPage/footer";

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
                green: "#27AE60",
              },
              components: {
                Menu: {
                  itemColor: "black",
                  horizontalItemSelectedColor: "var(--color-secondary)",
                  fontSize: 16,
                },
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