import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
const Prisma = new PrismaClient();

export default function Home({ data }) {
  const [formData, setFormData] = useState({});
  const [movies, setMovies] = useState(data);
  async function saveMovie(e) {
    e.preventDefault();
    setMovies([...movies, formData]);
    const res = await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return await res.json();
  }
  const deleteMovie = (item) => async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/${item.id}`, {
      method: 'DELETE',
    });
    const index = movies.indexOf(item);
    setMovies([
      ...movies.slice(0, index),
      ...movies.slice(index + 1, movies.length),
    ]);
  };

  return (
    <main className='min-h-screen flex items-start justify-evenly bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <Head>
        <title>Anime List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='max-w-md w-full space-y-8'>
        <form className='mt-8 space-y-6' onSubmit={saveMovie}>
          <input
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='text'
            placeholder='Title'
            name='title'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='text'
            placeholder='Year'
            name='year'
            onChange={(e) =>
              setFormData({ ...formData, year: +e.target.value })
            }
          />
          <textarea
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            name='description'
            id=''
            cols='30'
            rows='10'
            placeholder='Description'
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='text'
            placeholder='Slug'
            name='slug'
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <button
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            type='submit'
          >
            Add movie
          </button>
        </form>
      </section>
      <section className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className=' overflow-hidden'>
              <ul className='grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8'>
                {movies.map((item) => (
                  <li
                    className='flex justify-start max-w-xl px-4 py-4 bg-white shadow-md rounded-lg relative'
                    key={item.id}
                  >
                    <section className='py-2 flex flex-col items-center justify-between'>
                      <div className='leading-snug flex flex-col'>
                        <span
                          className='absolute top-0 bottom-0 right-0 px-4 py-3'
                          onClick={() => deleteMovie(item.id)}
                        >
                          <svg
                            className='fill-current h-5 w-5 text-gray-600'
                            role='button'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                          >
                            <title>Close</title>
                            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                          </svg>
                        </span>
                        <span>
                          <strong>{item.title}</strong>
                        </span>
                        <span>
                          <em>Release date:</em> {item.year}
                        </span>
                        <span>{item.description}</span>
                        <Link href={`/movies/${item.slug}`}>
                          <a className='text-blue-500'>More about this movie</a>
                        </Link>
                      </div>
                    </section>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const movies = await Prisma.movie.findMany();
  return {
    props: {
      data: movies,
    },
  };
}
