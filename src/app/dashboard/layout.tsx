import type { Metadata } from "next";
import SideNavbar from "@/components/sideNavbar";


export const metadata: Metadata = {
    title: "Exams Dashboard",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <SideNavbar />
                <main className="">
                    {children}
                </main>

            </body>
        </html>
    );
}