import type { Metadata } from "next";
import "./globals.css";
import { spaceGrotesk } from "@/lib/font";
import { cn } from "@/lib/utils";
import Navbar from "@/components/elements/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryClientProvider } from "@/components/providers/react-query-provider";
import Sidebar from "@/components/elements/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { SessionProvider } from "@/context/SessionContext";
import { validateRequest } from "@/lib/lucia";
import { CategoryScale, Chart } from "chart.js";
import Script from "next/script";
import FooterEditor from "@/components/elements/FooterEditor";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, session } = await validateRequest();
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(spaceGrotesk.className, "antialiased relative")}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryClientProvider>
                        <SessionProvider session={session} user={user}>
                            <SidebarProvider>
                                <Navbar />
                                <Sidebar />
                                {children}
                                {session && <FooterEditor />}
                            </SidebarProvider>
                        </SessionProvider>
                    </ReactQueryClientProvider>
                </ThemeProvider>
                <Toaster richColors position="top-center" />
                <Script
                    src={`https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6/tinymce.min.js`}
                    referrerPolicy="origin"
                />
            </body>
        </html>
    );
}
