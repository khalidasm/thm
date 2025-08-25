"use client";

import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Episode } from "@/types";
import { FormatUtils } from "@/utils";
import { Play, MoreVertical } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import Image from 'next/image';
import { AUTHOR_COLORS, AUTHOR_BACKGROUND_COLORS } from "@/constants";

interface EpisodeCardProps {
    episode: Episode;
    className?: string;
    index: number;
}


const EpisodeCard = ({ episode, className = "", index }: EpisodeCardProps) => {
    const [isHidden, setIsHidden] = useState(false);

    const formatDuration = (seconds?: number) => {
        return FormatUtils.formatDuration(seconds);
    };

    const authorColor = AUTHOR_COLORS[index % AUTHOR_COLORS.length];
    const authorBackgroundColor = AUTHOR_BACKGROUND_COLORS[index % AUTHOR_BACKGROUND_COLORS.length];

    const handleHide = () => setIsHidden(true);
    const handleUnhide = () => setIsHidden(false);
    const handleGoToEpisode = () => {
        if (episode.trackViewUrl) {
            window.open(episode.trackViewUrl, "_blank");
        }
    };

    return (
        <Card className={`flex flex-row items-stretch ${authorBackgroundColor} rounded-lg w-full 2xl:w-[400px] shadow-none border-none ${className} !py-0 gap-1`}>
            <div className="w-[110px] flex-shrink-0 relative overflow-hidden rounded-l-lg bg-muted">
                {isHidden ? (
                    <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center" />
                ) : episode.itunesImage ? (
                    <Image
                        src={episode.itunesImage}
                        alt={episode.title}
                        layout="fill"
                        objectFit="contain"
                    />
                ) : episode.podcastArtwork ? (
                    <Image
                        src={episode.podcastArtwork}
                        alt={episode.podcastName || "Podcast"}
                        layout="fill"
                        objectFit="contain"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-between p-2 flex-1 min-w-0 h-[110px]">
                <div className="flex items-start justify-between">
                    <span className={`${authorColor} text-xs font-medium mb-1 truncate max-w-[70%]`}>
                        {isHidden ? 'Hidden' : episode.podcastName || ""}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 flex-shrink-0 hover:bg-transparent !p-0"
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
                                        onClick={handleGoToEpisode}
                                        className="text-white hover:bg-black/20 focus:bg-black/20 focus:text-white"
                                    >
                                        Go to episode
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
                <div className="mt-1 mb-2 flex-1 min-w-0">
                    <span
                        className="block text-base font-bold text-white truncate"
                        title={isHidden ? 'Hidden episode' : episode.title || ""}
                    >
                        {isHidden ? 'Hidden episode' : episode.title || ""}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                    <span>{isHidden ? '—' : moment(episode.pubDate).format("D MMM")}</span>
                    <span>
                        {isHidden ? '—' : (typeof episode.duration === "number" && !isNaN(episode.duration)
                            ? formatDuration(episode.duration)
                            : "—")}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default EpisodeCard;
