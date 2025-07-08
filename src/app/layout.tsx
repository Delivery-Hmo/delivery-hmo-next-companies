import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import { ReactNode, Suspense } from "react";
import { ConfigProvider } from "antd";
import ClientLayout from "@src/components/clientComponents/clientLayout";
import Header from "@src/components/serverComponents/landingPage/header";
import FullLoader from "@src/components/clientComponents/fullLoader";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@src/components/serverComponents/landingPage/footer";
import { getCookie } from "cookies-next/server";
import { parseFirebaseAuth } from "@src/utils/serverFunctions";
import { cookies } from 'next/headers';

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const firebaseAuthCookie = await getCookie("firebaseAuth", { cookies });
  const firebaseAuth = await parseFirebaseAuth(firebaseAuthCookie);

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            //colores globales
            theme={{
              token: {
                colorPrimary: "#274C87",
                colorSuccess: "var(--color-success)",
                colorText: "var(--color-text)",
                colorLink: "var(--color-link)",
                green: "var(--color-success)",
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
              <ClientLayout firebaseAuth={firebaseAuth}>
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