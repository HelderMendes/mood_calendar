'use client';
import { gradients, baseRating } from '@/utils';
import React, { useState } from 'react';

const months = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec',
};
const monthsArr = Object.keys(months);
// const now = new Date();
const dayList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props;
    const today = new Date();
    const currentMonth = today.getMonth();
    const [selectedMonth, setSelectedMonth] = useState(
        Object.keys(months)[currentMonth]
    );
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const numericMonth = monthsArr.indexOf(selectedMonth);
    const data = completeData?.[selectedYear]?.[numericMonth] || {};

    function handleIncrementMonth(val) {
        // value +1 or -1
        // if we hit the bounds of he months, the we can just adjust the year that is displayed instead
    }

    console.log('Selected Month: ', selectedMonth);

    // const { demo, data, handleSetMood } = props;
    // const year = 2024;
    // const month = 'September';

    // Get index of month (e.g. for 'September', it would return 6)
    const monthIndex = Object.keys(months).indexOf(selectedMonth);
    const monthNow = new Date(selectedYear, monthIndex, 1);
    const firstDayOfMonth = monthNow.getDay(); // Day of the week for 1st of the month

    // Calculate number of days in the month
    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

    // Total number of cells needed (days + leading days for starting weekday)
    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = Math.ceil(daysToDisplay / 7);

    //     const monthNow = new Date(year, Object.keys(month).indexOf(month), 1);
    //     const firstDayOfMonth = monthNow.getDay();
    //     const daysInMonth = new Date(year, Object.keys(month) + 1, 0);

    //     const daysToDispaly = firstDayOfMonth + daysInMonth;
    //     const numRows = Math.floor(daysToDispaly / 7) + (daysToDispaly % 7 ? 1 : 0);
    return (
        <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
            {[...Array(numRows).keys()].map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="grid grid-cols-7 gap-1">
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex =
                                rowIndex * 7 +
                                dayOfWeekIndex -
                                (firstDayOfMonth - 1);

                            let dayDisplay =
                                dayIndex > daysInMonth
                                    ? false
                                    : row === 0 &&
                                      dayOfWeekIndex < firstDayOfMonth
                                    ? false
                                    : true;

                            let isToday = dayIndex === today.getDate();

                            if (!dayDisplay) {
                                return (
                                    <div
                                        className="bg-white"
                                        key={dayOfWeekIndex}
                                    />
                                );
                            }

                            let color = demo
                                ? gradients.indigo[baseRating[dayIndex]]
                                : dayIndex in data
                                ? gradients.indigo[data[dayIndex]]
                                : 'white';

                            return (
                                <div
                                    style={{ background: color }}
                                    className={
                                        'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
                                        (isToday
                                            ? ' border-indigo-400'
                                            : ' border-indigo-100') +
                                        (color === 'white'
                                            ? ' text-indigo-400'
                                            : ' text-white')
                                    }
                                    key={dayOfWeekIndex}
                                >
                                    <p>{dayIndex}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
