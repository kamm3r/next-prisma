import { PrismaClient } from '@prisma/client';
const Prisma = new PrismaClient();

export default async (req, res) => {
  const data = JSON.parse(req.body);

  const createMovie = await Prisma.movie.create({
    data,
  });

  res.json(createMovie);
};
