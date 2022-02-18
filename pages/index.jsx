import Head from 'next/head';
import { useState } from 'react';
import Form from '../components/Form';
import Movies from '../components/Movies';
import prisma from '../lib/prisma';
import toast from 'react-hot-toast';
import Edit from '../components/Edit';
import { useTheme } from 'next-themes';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useRouter } from 'next/router';

export default function Home({ data }) {
  const [formData, setFormData] = useState({});
  const [movies, setMovies] = useState(data);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setMovies([...movies, formData]);
      await fetch('api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      e.target.reset();
      await router.push('/');
      toast.success('Movies/Series Added!');
    } catch (err) {
      console.error(err);
      return toast.error("Couldn't Add");
    }
  };

  return (
    <div className='relative bg-image-white dark:bg-image-dark'>
      <Head>
        <title>Favorites List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <button
        className='absolute z-40 px-6 py-4'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? (
          <MdOutlineLightMode className='text-3xl text-gray-600' />
        ) : (
          <MdOutlineDarkMode className='text-3xl text-gray-600' />
        )}
      </button>

      {/* <header className='fixed z-50'>
        <div className='flex justify-center items-center w-screen'>
          <h1 className='text-5xl font-bold text-gray-500'>Favorites List</h1>
        </div>
      </header> */}
      <main className='bg-white/20 dark:bg-black/20 backdrop-blur flex items-start justify-evenly py-12 px-4 sm:px-6 lg:px-8 overflow-hidden max-h-screen'>
        <section className='max-w-md w-full space-y-8'>
          <Form
            submitHandler={submitHandler}
            setFormData={setFormData}
            formData={formData}
          />
        </section>
        <section className='flex flex-col pb-10 overflow-y-scroll scrollbar max-h-screen'>
          <ul className='grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8'>
            {movies &&
              movies.map((item, i) => (
                <Movies
                  key={i}
                  id={item.id}
                  title={item.title}
                  year={item.year}
                  description={item.description}
                  slug={item.slug}
                />
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const movies = await prisma.Movie.findMany();
  return {
    props: {
      data: movies,
    },
  };
}
