import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const movieId = req.query.id;

  const result = await prisma.Movie.update({
    where: { id: Number(movieId) },
  });

  res.json(result);
}
