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

interface UserData {
  [year: string]: {
    [month: string]: {
      [day: string]: number;
    };
  };
}

interface StatusesProps {
  num_days: number;
  avarage_mood: string | number;
  time_remaining: string;
}

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState<UserData | {}>({});
  const now = new Date();

  function countValues() {
    let totalNumberOfDays = 0;
    let sumMoods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let daysMood = data[year][month][day];
          totalNumberOfDays++;
          sumMoods += daysMood;
        }
      }
    }
    return {
      num_days: totalNumberOfDays,
      avarage_mood:
        totalNumberOfDays > 0
          ? (sumMoods / totalNumberOfDays).toFixed(2)
          : 'N/A',
    };
  }

  const statuses: StatusesProps = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`, // Calculate remaining hours and minutes as a string
  };

  async function handleSetMood(mood: number) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj } as UserData;
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
      const docRef = doc(db, 'users', currentUser.uid as string);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true },
      );
    } catch (error: any) {
      console.log('Fail to save your mood', error.message);
    }
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      setData({}); // Clear the data when logged out
      return;
    }
    setData(userDataObj as UserData); // Set the user data when logged in
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

  const moods: Record<string, string> = {
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
    <div className='md-gap-20 flex flex-1 flex-col gap-10 sm:gap-14'>
      <DateTimeBanner />
      <div className='grid grid-cols-3 gap-4 rounded-lg bg-indigo-50 p-4 text-indigo-500'>
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex} className='flex flex-col gap-1 p-4 sm:gap-2'>
            <p className='truncate text-xs font-medium capitalize sm:text-sm'>
              {status.replaceAll('-', ' ')}
            </p>
            <p className={'truncate ' + fugaz.className}>
              {statuses[status as keyof StatusesProps]}
              {status === 'num_days' ? ' 🌶️' : ' 🤯'}
            </p>
          </div>
        ))}
      </div>
      <h4
        className={
          'text-balance text-center text-5xl leading-loose sm:text-6xl md:text-7xl ' +
          fugaz.className
        }
      >
        How do you <span className='textGradient'>feel</span> today
      </h4>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                // const currentMoodValue = moodIndex + 1;
                const currentMoodValue = moodIndex;
                handleSetMood(currentMoodValue);
              }}
              className={
                'purpleShadow gap-2 rounded-lg bg-indigo-50 p-4 duration-200 hover:bg-[lavender] ' +
                (moodIndex === 8
                  ? ' col-span-2 sm:col-span-1 md:col-span-2'
                  : '')
              }
              key={moodIndex}
            >
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>

              <p className={'pt-2 text-xl text-indigo-500 ' + fugaz.className}>
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
