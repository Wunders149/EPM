import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
  const { name, description, topic, topicDate, leaderName, leaderBio, leaderPhoto, leaderContact } = body;

  const level = await prisma.level.create({
    data: {
      name,
      description,
      topic,
      topicDate,
      leader: {
        create: {
          name: leaderName,
          bio: leaderBio,
          photoUrl: leaderPhoto,
          contact: leaderContact,
        },
      },
    },
    include: { leader: true },
  });

  return NextResponse.json(level);
}
