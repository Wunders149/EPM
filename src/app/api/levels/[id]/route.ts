import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await props.params;
  const id = params.id;
  const body = await request.json();
  const { name, description, topic, leaderName, leaderBio, leaderPhoto, leaderContact } = body;

  const level = await prisma.level.update({
    where: { id },
    data: {
      name,
      description,
      topic,
      leader: {
        upsert: {
          create: {
            name: leaderName,
            bio: leaderBio,
            photoUrl: leaderPhoto,
            contact: leaderContact,
          },
          update: {
            name: leaderName,
            bio: leaderBio,
            photoUrl: leaderPhoto,
            contact: leaderContact,
          },
        },
      },
    },
    include: { leader: true },
  });

  return NextResponse.json(level);
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await props.params;
  const id = params.id;
  await prisma.level.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}