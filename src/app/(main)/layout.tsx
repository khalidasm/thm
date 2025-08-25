import { ErrorBoundary, LoadingSpinner } from "@/components/layout";
import { SearchLayout } from "@/features/search/components";
import { SearchProvider } from "@/lib/contexts/SearchContext";
import { Suspense } from "react";


function MainLayoutLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner 
        message="Loading Thmanyah..." 
        size="xl"
        variant="default"
      />
    </div>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<MainLayoutLoading />}>
        <SearchProvider>
          <div className="min-h-screen bg-background">
            <div className="px-4 py-8">
              <SearchLayout>
                {children}
              </SearchLayout>
            </div>
          </div>
        </SearchProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
