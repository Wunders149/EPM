import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const gallery = await prisma.galleryItem.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { type, url, caption } = body;

  const item = await prisma.galleryItem.create({
    data: { type, url, caption },
  });

  return NextResponse.json(item);
}
