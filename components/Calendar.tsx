'use client';
import { gradients, baseRating } from '@/utils';
import React, { useState } from 'react';
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

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
const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface CalendarProps {
  demo?: boolean | null;
  completeData?: Record<number, Record<number, unknown>>;
  handleSetMood?: (mood: unknown) => void;
}

export default function Calendar({
  demo = false,
  completeData = {},
  handleSetMood,
}: CalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currentMonth],
  );
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  // const data: boolean = !!completeData?.[selectedYear]?.[numericMonth];
  const data = completeData[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val: number) {
    const newMonthIndex = numericMonth + val;

    if (newMonthIndex < 0) {
      // If we go below January, set to December of the previous year
      setSelectedYear((prevYear) => prevYear - 1);
      setSelectedMonth(monthsArr[11]); // December
    } else if (newMonthIndex > 11) {
      // If we go above December, set to January of the next year
      setSelectedYear((prevYear) => prevYear + 1);
      setSelectedMonth(monthsArr[0]); // January
    } else {
      // Normal case, increment or decrement the month
      setSelectedMonth(monthsArr[newMonthIndex]);
    }
  }

  console.log('Selected Month: ', selectedMonth);

  // Get index of month (e.g. for 'September', it would return 6)
  const monthIndex = Object.keys(months).indexOf(selectedMonth);
  const monthNow = new Date(selectedYear, monthIndex, 1);
  const firstDayOfMonth = monthNow.getDay(); // Day of the week for 1st of the month

  // Calculate number of days in the month
  const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

  // Total number of cells needed (days + leading days for starting weekday)
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.ceil(daysToDisplay / 7);

  return (
    <div className='mt-4 flex flex-col gap-2'>
      <div className='-mb-1 grid grid-cols-5 gap-0 text-2xl text-indigo-400 sm:-mb-5 sm:text-3xl'>
        <button
          onClick={() => {
            handleIncrementMonth(-1);
          }}
          className='mr-auto'
        >
          <i className='fa-solid fa-circle-chevron-left text-4xl duration-200 hover:text-indigo-700'></i>
        </button>
        <p
          className={
            fugaz.className +
            ' textGradient col-span-3 pt-2 text-center capitalize'
          }
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => {
            handleIncrementMonth(+1);
          }}
          className='ml-auto'
        >
          <i className='fa-solid fa-circle-chevron-right text-3xl duration-200 hover:text-indigo-700'></i>
        </button>
      </div>
     <div className='flex flex-col gap-1 overflow-hidden py-4 sm:py-6 md:py-10'>
        {[...Array(numRows).keys()].map((row, rowIndex) => (
          <div key={rowIndex} className='grid grid-cols-7 gap-1'>
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              let dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

              let isToday = dayIndex === today.getDate();

              if (!dayDisplay) {
                return <div className='bg-white' key={dayOfWeekIndex} />;
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
                    'flex items-center justify-between gap-2 rounded-lg border border-solid p-2 text-xs sm:text-sm ' +
                    (isToday ? ' border-indigo-400' : ' border-indigo-100') +
                    (color === 'white' ? ' text-indigo-400' : ' text-white')
                  }
                  key={dayOfWeekIndex}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
