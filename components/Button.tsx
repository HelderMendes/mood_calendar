import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' });

// interface ButtonProps {
//   text: string;
//   full?: boolean;
//   dark?: boolean;
//   className?: string;
//   clickHandler(): void; // Add style prop for inline CSS
// }

export default function Button(props) {
  const { text, dark, full, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={
        'overflow-hidden rounded-full border-2 border-solid border-indigo-600 duration-200 hover:opacity-60 ' +
        (dark ? ' bg-indigo-600 text-white' : ' text-indigo-600') +
        (full ? ' grid w-full place-items-center' : ' ')
      }
    >
      <p
        className={
          'sm;px-10 whitespace-nonwrap px-6 py-2 sm:py-3 ' + fugaz.className
        }
      >
        {text}
      </p>
    </button>
  );
}
