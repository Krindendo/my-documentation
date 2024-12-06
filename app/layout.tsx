import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Pattern } from "./_components/pattern";
import { SiteFooter } from "./_components/footer";
import { SiteHeader } from "./_components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteSidebar } from "./_components/sidebar";

const calSans = localFont({
  src: "./fonts/CalSans-SemiBold.woff",
  variable: "--font-heading",
});
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${calSans.variable} ${fontSans.variable} antialiased`}>
        <ThemeProvider>
          <SidebarProvider>
            <SiteSidebar />
            <SidebarInset>
              <SiteHeader />
              <Pattern />
              {children}
              <SiteFooter />
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
