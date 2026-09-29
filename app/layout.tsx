import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuldeep Devarasetty | Computer Science Engineer",
  description:
    "Portfolio of Kuldeep Devarasetty — Computer Science Engineering student working across AI, Agentic AI, MCP, full-stack development, robotics, computer vision and IoT.",
  keywords: [
    "Kuldeep Devarasetty",
    "Computer Science Engineer",
    "AI",
    "Machine Learning",
    "Agentic AI",
    "MCP",
    "Full-Stack Developer",
    "IoT",
    "Robotics",
    "Portfolio",
  ],
  authors: [{ name: "Kuldeep Devarasetty" }],
  openGraph: {
    type: "website",
    title: "Kuldeep Devarasetty | Computer Science Engineer",
    description:
      "Portfolio of Kuldeep Devarasetty — Computer Science Engineering student working across AI, Agentic AI, MCP, full-stack development, robotics, computer vision and IoT.",
    siteName: "Kuldeep Devarasetty Portfolio",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kuldeep Devarasetty",
              url: "https://kuldeep-portfolio.vercel.app",
              jobTitle: "Computer Science Engineering Student",
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Agentic AI",
                "Model Context Protocol",
                "Full-Stack Development",
                "IoT",
                "Robotics",
                "Computer Vision",
              ],
              sameAs: [
                "https://github.com/DevarasettyKuldeep",
                "https://www.linkedin.com/in/devarasetty-kuldeep-8083b5350/",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-white font-sans selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
