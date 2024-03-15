import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { getTranslations } from "next-intl/server";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string
  };
};

const inter = Inter({
  subsets: ["latin"],
});

export async function generateMetadata({ params: { locale } }: LayoutProps) {
  const t = await getTranslations({locale, namespace: 'home'});
 
  return {
    title: t('title'),
    description: t('description'),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

export default function RootLayout({
  children,
  params: {
    locale
  }
}: LayoutProps) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
