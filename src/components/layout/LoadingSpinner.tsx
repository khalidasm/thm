"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'minimal' | 'fullscreen';
    className?: string;
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
};

const LoadingSpinner = ({
    message = "Loading...",
    size = 'lg',
    variant = 'default',
    className
}: LoadingSpinnerProps) => {
    const spinnerContent = (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={cn("text-secondary", sizeClasses[size])}
        >
            <Loader2 className="h-full w-full" />
        </motion.div>
    );

    if (variant === 'minimal') {
        return spinnerContent;
    }

    if (variant === 'fullscreen') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                >
                    {spinnerContent}
                    {message && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-secondary font-medium"
                        >
                            {message}
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn("flex flex-col items-center justify-center py-12", className)}
        >
            {spinnerContent}
            {message && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-secondary font-medium"
                >
                    {message}
                </motion.p>
            )}
        </motion.div>
    );
}

export default LoadingSpinner;