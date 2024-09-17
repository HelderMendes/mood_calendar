'use client';
import React, { useEffect, useState } from 'react';
import { Fugaz_One } from 'next/font/google';
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Loading from './Loading';
import Login from './Login';
import DateTimeBanner from './DateTimeBanner';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

interface StatusesProps {
    num_days: number;
    avarage_mood: string;
    time_remaining: string;
}

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
    const [data, setData] = useState({});
    const now = new Date();

    function countValues() {
        let totalNumberOfDays = 0;
        let SumMoods = '';
    }

    async function handleSetMood(mood: number) {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();

        try {
            const newData = { ...userDataObj };
            if (!newData?.[year]) {
                newData[year] = {};
            }
            if (!newData?.[year]?.[month]) {
                newData[year][month] = {};
            }

            newData[year][month][day] = mood;
            // update the currente state
            setData(newData);
            // update the global state
            setUserDataObj(newData);
            // update firebase
            const docRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(
                docRef,
                {
                    [year]: {
                        [month]: {
                            [day]: mood,
                        },
                    },
                },
                { merge: true }
            );
        } catch (error) {
            console.log('Fail to save your mood', error.message);
        }
    }

    useEffect(() => {
        if (!currentUser || !userDataObj) {
            setData({}); // Clear the data when logged out
            return;
        }
        setData(userDataObj); // Set the user data when logged in
    }, [currentUser, userDataObj]);

    // const { currentUser, loading } = useAuth();
    // const isAuth = true;
    if (loading) {
        return <Loading />; // Show a loading indicator while fetching auth state
    }

    if (!currentUser) {
        return <Login />; // Show the login form when no user is logged in
    }
    // !isAuth ? (children = <Login />) : (children = <Dashboard />);

    // const statuses: StatusesProps = {
    //     num_days: 14,
    //     time_remaining: '13:14:25',
    //     date: new Date().toDateString(),
    // };
    const statuses: StatusesProps = {
        num_days: 14,
        avarage_mood: new Date().toDateString(),
        time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`, // Calculate remaining hours and minutes as a string
    };

    const moods = {
        Angry: '😤',
        Sad: '😭',
        Worried: '😥',
        Scared: '😟',
        Frustrated: '😠',
        Being: '🙂',
        Good: '😙',
        Silly: '😜',
        Happy: '😍',
    };

    return (
        <div className="flex flex-col flex-1 gap-10 sm:gap-14 md-gap-20">
            <DateTimeBanner />
            <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
                {Object.keys(statuses).map((status, statusIndex) => {
                    return (
                        <div
                            key={statusIndex}
                            className="p-4 flex flex-col gap-1 sm:gap-2"
                        >
                            <p className="font-medium capitalize text-xs sm:text-sm truncate">
                                {status.replaceAll('-', ' ')}
                            </p>
                            <p className={'truncate ' + fugaz.className}>
                                {statuses[status]}
                            </p>
                        </div>
                    );
                })}
            </div>
            <h4
                className={
                    'text-5xl sm:text-6xl md:text-7xl text-center leading-loose text-balance ' +
                    fugaz.className
                }
            >
                How do you <span className="textGradient">feel</span> today
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Object.keys(moods).map((mood, moodIndex) => {
                    return (
                        <button
                            onClick={() => {
                                // const currentMoodValue = moodIndex + 1;
                                const currentMoodValue = moodIndex;
                                handleSetMood(currentMoodValue);
                            }}
                            className={
                                'p-4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-[lavender] gap-2 ' +
                                (moodIndex === 8
                                    ? ' col-span-2 sm:col-span-1 md:col-span-2'
                                    : '')
                            }
                            key={moodIndex}
                        >
                            <p className="text-4xl sm:text-5xl md:text-6xl">
                                {moods[mood]}
                            </p>

                            <p
                                className={
                                    'text-indigo-500 text-xl pt-2 ' +
                                    fugaz.className
                                }
                            >
                                {mood}
                            </p>
                        </button>
                    );
                })}
            </div>
            <Calendar completeData={data} handleSetMood={handleSetMood} />
        </div>
    );
}
