import Main from '@/components/Main';
import Dashboard from '@/components/Dashboard';
// import Login from '@/components/Login';
// import { useAuth } from '@/context/AuthContext';

export const metadata = {
  title: 'Start • Broodl New Title',
  description:
    'Extra description – Track your daily mood every day of the year!',
};

function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}

export default DashboardPage;
