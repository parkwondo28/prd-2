import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "워크스팟 - 일하기 좋은 곳을 찾아서",
  description: "사진 찍기 좋은 곳이 아닌, 실제로 일하기 좋은 곳을 찾아서",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
