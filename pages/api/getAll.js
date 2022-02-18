import prisma from '../../lib/prisma';

export async function handle(req, res) {
  const result = await prisma.Movie.findMany();
  res.json(result);
}
