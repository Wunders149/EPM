import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
  const { title, content, isActive } = body;

  const announcement = await prisma.announcement.update({
    where: { id },
    data: {
      title,
      content,
      isActive,
    },
  });

  return NextResponse.json(announcement);
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
  await prisma.announcement.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
