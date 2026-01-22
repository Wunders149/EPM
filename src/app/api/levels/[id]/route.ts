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
  const { name, description, leaderName, leaderBio, leaderPhoto } = body;

  // We need to update Level and potentially Leader
  // Note: If leader doesn't exist (legacy), we might need upsert, but our schema enforces leader creation.
  const level = await prisma.level.update({
    where: { id },
    data: {
      name,
      description,
      leader: {
        update: {
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
