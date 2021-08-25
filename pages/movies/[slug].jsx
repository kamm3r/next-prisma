import Head from 'next/head';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default function Movie({ movie }) {
  return (
    <div className='bg-black'>
      <Head>
        <title>{movie.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const movie = await prisma.movie.findFirst({
    where: {
      slug: slug,
    },
  });

  return {
    props: {
      movie,
    },
  };
}
