import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(announcements);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, content, isActive } = body;

  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
      isActive: isActive !== undefined ? isActive : true,
    },
  });

  return NextResponse.json(announcement);
}
