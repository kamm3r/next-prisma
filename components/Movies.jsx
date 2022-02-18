import Link from 'next/link';
import { useState } from 'react';
import Delete from './Delete';
import Update from './Update';

export default function Movies({ id, title, year, description, slug }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <li className='flex justify-start max-w-xl px-4 py-4 bg-white/20 dark:bg-black/20 backdrop-blur border border-gray-200 dark:border-gray-900 shadow-md shadow-white dark:shadow-black rounded-lg relative'>
        <section className='py-2 flex flex-col items-center justify-between'>
          <div className='leading-snug flex flex-col text-black dark:text-gray-400'>
            <Delete id={id} />
            <span
              className='absolute top-0 right-10 px-4 py-3 cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-900'
              onClick={() => setEdit(!edit)}
            >
              Edit
            </span>
            <span>
              <strong>{title}</strong>
            </span>
            <span>
              <em>Release date:</em> {year}
            </span>
            <span>{description}</span>
            <Link href={`/movies/${slug}`}>
              <a className='text-blue-500'>More about this movie</a>
            </Link>
          </div>
        </section>
      </li>
      {!edit ? '' : <Update id={id} />}
    </>
  );
}
