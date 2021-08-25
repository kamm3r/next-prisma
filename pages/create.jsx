import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Router from 'next/router';
const Prisma = new PrismaClient();

export default function Form({ data }) {
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
  return (
    <section className='max-w-md w-full space-y-8'>
      <form className='mt-8 space-y-6' onSubmit={saveMovie}>
        <input
          className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          type='text'
          placeholder='Title'
          name='title'
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          type='text'
          placeholder='Year'
          name='year'
          onChange={(e) => setFormData({ ...formData, year: +e.target.value })}
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
  );
}
