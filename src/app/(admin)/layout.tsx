import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ErrorBoundary, LoadingSpinner } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Database Admin - Thmanyah",
  description: "Supabase Database Administration Interface",
};

// Loading component for admin layout
function AdminLayoutLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner 
        message="Loading Admin Panel..." 
        size="xl"
        variant="default"
      />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} h-full bg-background`}>
      <ErrorBoundary>
        <Suspense fallback={<AdminLayoutLoading />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
