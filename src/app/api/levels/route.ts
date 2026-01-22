import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const levels = await prisma.level.findMany({
    include: { leader: true },
  });
  return NextResponse.json(levels);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, leaderName, leaderBio, leaderPhoto } = body;

  const level = await prisma.level.create({
    data: {
      name,
      description,
      leader: {
        create: {
          name: leaderName,
          bio: leaderBio,
          photoUrl: leaderPhoto,
        },
      },
    },
    include: { leader: true },
  });

  return NextResponse.json(level);
}
