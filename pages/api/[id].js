import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const movieId = req.query.id;

  if (req.method === 'GET') {
    handleGET(movieId, res);
  } else if (req.method === 'DELETE') {
    handleDELETE(movieId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function handleGET(movieId, res) {
  const getMovie = await prisma.Movie.findUnique({
    where: { id: Number(movieId) },
  });
  res.json(getMovie);
}

async function handleDELETE(movieId, res) {
  const deleteMovie = await prisma.Movie.delete({
    where: { id: Number(movieId) },
  });
  res.json(deleteMovie);
}
