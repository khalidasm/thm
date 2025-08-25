"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Podcast } from "@/types";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { AUTHOR_COLORS } from "@/constants";

interface PodcastCardProps {
    podcast: Podcast;
    className?: string;
    index: number;
}

const PodcastCard = ({ podcast, className = "", index }: PodcastCardProps) => {
    const [isHidden, setIsHidden] = useState(false);
    
    const authorColor = AUTHOR_COLORS[index % AUTHOR_COLORS.length];

    const handleHide = () => setIsHidden(true);
    const handleUnhide = () => setIsHidden(false);
    const handleGoToPodcast = () => window.open(podcast.collectionViewUrl, "_blank");

    return (
        <Card className={`w-full h-full min-h-[300px] border-none shadow-none ${className} cursor-pointer py-0`}>
            <CardContent className="p-0 flex flex-col h-full gap-2">
                <div className="flex-1 relative min-h-[200px]">
                    {isHidden ? (
                        <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center cursor-pointer" />
                    ) : podcast.artworkUrl600 ? (
                        <Image
                            src={podcast.artworkUrl600}
                            alt={podcast.collectionName || ""}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg cursor-pointer"
                            onClick={handleGoToPodcast}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No Image</span>
                        </div>
                    )}
                </div>
                <div className="flex justify-between relative">
                    <span className={`text-sm mr-2 shrink-0 ${isHidden ? 'text-muted-foreground' : 'text-index'}`}>
                        #{index + 1}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0 pr-8">
                        <h3 className={`font-semibold text-sm line-clamp-1 capitalize ${isHidden ? 'text-muted-foreground' : ''}`}>
                            {isHidden ? 'Hidden' : podcast.collectionName || ""}
                        </h3>
                        <p className={`text-xs line-clamp-1 mt-0.5 capitalize ${isHidden ? 'text-muted-foreground' : authorColor}`}>
                            {isHidden ? 'Podcast hidden' : podcast.artistName || ""}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 flex-shrink-0 hover:bg-transparent !p-0 absolute right-0 top-0"
                            >
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="gradient-dropdown">
                            {isHidden ? (
                                <DropdownMenuItem
                                    onClick={handleUnhide}
                                    className="text-white hover:bg-black/20 focus:bg-black/20 focus:text-white"
                                >
                                    Unhide
                                </DropdownMenuItem>
                            ) : (
                                <>
                                    <DropdownMenuItem
                                        onClick={handleGoToPodcast}
                                        className="text-white hover:bg-black/20 focus:bg-black/20 focus:text-white"
                                    >
                                        Go to podcast
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleHide}
                                        className="text-white hover:bg-black/20 focus:bg-black/20 focus:text-white"
                                    >
                                        Hide
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
};

export default PodcastCard;
