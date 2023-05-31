import UploadBtn from "../components/UploadBtn"
import "./globals.css"

import AppLayoutServer from "@/components/nav/AppLayoutServer"
import WalletClient from "./WalletClient"

const basicMetadata = {
  title: {
    template: "%s - DiiR",
    default: "DiiR",
  },
  description: "Content sharing platform for everyone.",
}

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL!),
  ...basicMetadata,
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/favicon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon/favicon.ico",
    },
  },
  openGraph: {
    ...basicMetadata,
    url: "https://www.diir.xyz",
    siteName: "diir.xyz",
    images: [
      {
        url: process.env.LOGO_URL!,
        width: 800,
        height: 600,
        alt: "DiiR Logo",
      },
    ],
    locale: "en_US",

    type: "website",
  },
  twitter: {
    ...basicMetadata,
    card: "summary_large_image",
    site: "@DiiRxyz",
    creator: "@DiiRxyz",
    images: [
      {
        url: process.env.LOGO_URL!,
        width: 800,
        height: 600,
        alt: "DiiR Logo",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.diir.xyz",
    media: {
      "only screen and (max-width: 639px)": "https://m.diir.xyz",
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-textRegular">
        <WalletClient>
          {/* @ts-expect-error Async Server Component */}
          <AppLayoutServer />

          <div className="min-h-screen overflow-y-auto">{children}</div>

          <div className="fixed bottom-10 right-8 max-w-max sm:hidden">
            <UploadBtn />
          </div>
        </WalletClient>
      </body>
    </html>
  )
}
