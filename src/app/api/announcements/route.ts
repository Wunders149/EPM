import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  const announcements = await prisma.announcement.findMany({
    where: session ? {} : { isActive: true },
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