import { PrismaClient } from '@prisma/client';
const Prisma = new PrismaClient();

export default async function handle(req, res) {
  const id = JSON.parse(req.query.id);
  if (req.method == 'DELETE') {
    console.log('Deleting a movie..');
    const removeMovie = await Prisma.movie.delete({
      where: { id: Number(id) },
    });
    res.json(removeMovie);
  }
}
