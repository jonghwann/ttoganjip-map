import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "또간집 지도",
  description: "또간집 선정 맛집을 지도에서 탐색하는 사이드 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
