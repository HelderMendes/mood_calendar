import React, { useEffect, useState } from 'react';

export default function DateTimeBanner() {
    const [numDays, setNumDays] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().toDateString());

    // Function to calculate days remaining in the current month
    function calculateDaysUntilEndOfMonth() {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
        const diffTime = lastDay.getTime() - today.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        setNumDays(daysRemaining);
    }

    // Function to calculate remaining time until the end of the day
    function calculateTimeRemaining() {
        const now = new Date();
        const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0,
            0,
            0
        ); // Next midnight
        const diffTime = endOfDay.getTime() - now.getTime();

        const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
        const seconds = Math.floor((diffTime / 1000) % 60);

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setTimeRemaining(formattedTime);
    }

    useEffect(() => {
        calculateDaysUntilEndOfMonth();
        calculateTimeRemaining();

        const timer = setInterval(() => {
            calculateTimeRemaining();
        }, 1000); // Update time remaining every second

        return () => clearInterval(timer); // Clear the interval when the component unmounts
    }, []);

    return (
        <div className="banner">
            <p>Days remaining in the month: {numDays} days</p>
            <p>Time remaining today: {timeRemaining}</p>
            <p>Current date: {currentDate}</p>
        </div>
    );
}
