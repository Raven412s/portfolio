"use client";
import { useEffect, useState } from "react";

export default function EntryScreen({ onEnter }: { onEnter: (useMusic: boolean) => void }) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const duration = 3000;
        const intervalTime = 30;
        const increment = 100 / (duration / intervalTime);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + increment;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center p-10">
                <div className="w-full max-w-md relative">
                    <div
                        className="text-[#00A36C] font-mono mb-2 transition-all duration-75"
                        style={{ marginLeft: `${Math.min(progress, 90)}%` }}
                    >
                        {Math.round(progress)}%
                    </div>
                    <div className="h-0.5 w-full bg-gray-800 overflow-hidden">
                        <div
                            className="h-full bg-[#00A36C] shadow-[0_0_15px_#00A36C] transition-all duration-75"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-100 bg-black flex items-end justify-center">
            <video
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
                <source src="/entry-screen-background-video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/20 via-black/60 to-black/95 z-9" />

            <div className="relative z-10 pb-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <h1 className="text-white text-sm tracking-[0.3em] mb-8 font-light italic">CHOOSE YOUR EXPERIENCE</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <button
                        onClick={() => onEnter(true)}
                        className="group relative border border-white/30 px-10 py-3 rounded-full text-white overflow-hidden transition-all hover:border-white"
                    >
                        <span className="relative z-10 text-xs tracking-widest uppercase">Enter with Music</span>
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 opacity-10" />
                    </button>

                    <button
                        onClick={() => onEnter(false)}
                        className="group relative border border-white/30 px-10 py-3 rounded-full text-white overflow-hidden transition-all hover:border-white"
                    >
                        <span className="relative z-10 text-xs tracking-widest uppercase">Enter without Music</span>
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 opacity-10" />
                    </button>
                </div>
            </div>
        </div>
    );
}