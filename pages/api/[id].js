import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

// GET /api/:id
async function handleGET(movieId, res) {
  const movie = await prisma.movie.findUnique({
    where: { id: Number(movieId) },
    include: { slug: true },
  });
  res.json(movie);
}

// DELETE /api/:id
async function handleDELETE(movieId, res) {
  const movie = await prisma.movie.delete({
    where: { id: Number(movieId) },
  });
  res.json(movie);
}
