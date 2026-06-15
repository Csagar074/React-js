// components/Dashboard/CountdownTimer.tsx
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
    targetDate: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Clock className="text-white" size={24} />
                    <h2 className="text-white text-xl font-bold">Special Offer Countdown</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-3xl md:text-4xl font-bold text-black">
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div className="text-black text-sm mt-1">Days</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-3xl md:text-4xl font-bold text-black">
                            {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-black text-sm mt-1">Hours</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-3xl md:text-4xl font-bold text-black">
                            {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-black text-sm mt-1">Minutes</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-3xl md:text-4xl font-bold text-black">
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-black text-sm mt-1">Seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );
}