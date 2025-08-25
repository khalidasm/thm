"use client";

import { useState, useEffect, useRef } from "react";
import { Podcast } from "@/types";
import PodcastCard from "./PodcastCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid, List, MoreVertical } from "lucide-react";
import { useSearchContext } from "@/lib/contexts/SearchContext";
import { CustomScrollbar, Separator } from "@/components/ui";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface PodcastGridProps {
    podcasts: Podcast[];
    context?: "trending" | "search";
    remainingCount?: number;
}

const PodcastGrid = ({
    podcasts,
    context = "trending",
}: PodcastGridProps) => {
    const [layout, setLayout] = useState<"scroll" | "grid">("scroll");
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const customScrollbarRef = useRef<HTMLDivElement>(null);
    const { searchTerm } = useSearchContext();

    useEffect(() => {
        if (layout === "scroll") {
            const scrollableContainer = customScrollbarRef.current?.querySelector('.overflow-auto') as HTMLDivElement;
            if (scrollableContainer) {
                updateScrollState(scrollableContainer.scrollLeft);
            }
        }
    }, [layout, podcasts]);

    const updateScrollState = (scrollLeft: number) => {
        const scrollableContainer = customScrollbarRef.current?.querySelector('.overflow-auto') as HTMLDivElement;
        if (scrollableContainer) {
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(
                scrollLeft < scrollableContainer.scrollWidth - scrollableContainer.clientWidth
            );
        }
    };

    const scrollLeft = () => {

        const scrollableContainer = customScrollbarRef.current?.querySelector('.overflow-auto') as HTMLDivElement;
        if (scrollableContainer) {
            const currentScroll = scrollableContainer.scrollLeft;
            const newScroll = Math.max(0, currentScroll - 300);
            scrollableContainer.scrollTo({ left: newScroll, behavior: "smooth" });
            setTimeout(() => updateScrollState(scrollableContainer.scrollLeft), 100);
        }
    };

    const scrollRight = () => {
        const scrollableContainer = customScrollbarRef.current?.querySelector('.overflow-auto') as HTMLDivElement;
        if (scrollableContainer) {
            const currentScroll = scrollableContainer.scrollLeft;
            const maxScroll = scrollableContainer.scrollWidth - scrollableContainer.clientWidth;
            const newScroll = Math.min(maxScroll, currentScroll + 300);
            scrollableContainer.scrollTo({ left: newScroll, behavior: "smooth" });
            setTimeout(() => updateScrollState(scrollableContainer.scrollLeft), 100);
        }
    };

    const getTitle = () => {
        if (context === "search") {
            return `Top Podcasts for "${searchTerm}"`;
        }
        return "Trending Podcasts";
    };

    if (podcasts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No podcasts to display.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-2xl font-bold tracking-tight">{getTitle()}</h2>
                <div className="flex items-center gap-3">
                    {layout === "scroll" && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={scrollLeft}
                                disabled={!canScrollLeft}
                                className="h-9 w-9 p-0 rounded-full"
                            >
                                <ChevronLeft size={18} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={scrollRight}
                                disabled={!canScrollRight}
                                className="h-9 w-9 p-0 rounded-full"
                            >
                                <ChevronRight size={18} />
                            </Button>
                        </>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 rounded-full"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="gradient-dropdown -left-[200px]"
                        >
                            <DropdownMenuItem
                                onClick={() => setLayout(layout === "scroll" ? "grid" : "scroll")}
                                className="text-white hover:bg-black/20 focus:bg-black/20 focus:text-white"
                            >
                                {layout === "scroll" ? (
                                    <>
                                        <Grid className="w-4 h-4 mr-2" />
                                        Grid View
                                    </>
                                ) : (
                                    <>
                                        <List className="w-4 h-4 mr-2" />
                                        List View
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Separator className="my-2" />

            <div>
                <AnimatePresence mode="wait">
                    {layout === "scroll" ? (
                        <motion.div
                            key="scroll"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <div ref={customScrollbarRef} className="px-1">
                                <CustomScrollbar 
                                    className="pb-6"
                                    onScroll={(scrollLeft) => {
                                        updateScrollState(scrollLeft);
                                    }}
                                >
                                    <div
                                        ref={scrollContainerRef}
                                        className="flex items-start gap-4 py-2"
                                    >
                                        {podcasts.map((podcast, index) => (
                                            <div
                                                key={podcast.collectionId}
                                                className="flex-shrink-0 w-48 h-full"
                                            >
                                                <PodcastCard
                                                    podcast={podcast}
                                                    index={index}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CustomScrollbar>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 auto-rows-fr"
                        >
                            {podcasts.slice(0, 20).map((podcast, index) => (
                                <div key={podcast.collectionId} className="h-full">
                                    <PodcastCard
                                        podcast={podcast}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PodcastGrid;
