import Main from '@/components/Main';
import Dashboard from '@/components/Dashboard';
import Loading from '@/app/Loading';
import { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

export const metadata = {
  title: 'Start • Broodl New Title',
  description:
    'Extra description – Track your daily mood every day of the year!',
};

function DashboardPage(): JSX.Element {
  return (
    <Main>
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </Main>
  );
}

export default DashboardPage;
