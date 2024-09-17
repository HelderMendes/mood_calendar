import Calendar from '@/components/Calendar';
import CallToAction from './CallToAction';

export default function Hero() {
  return (
    <div className='flex flex-col gap-8 py-4 text-center sm:gap-10 md:py-10'>
      <CallToAction />
      <Calendar demo />
    </div>
  );
}
