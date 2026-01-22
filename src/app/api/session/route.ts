import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await prisma.sessionInfo.findUnique({
    where: { id: 1 },
  });
  return NextResponse.json(session);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { day, timeRange, location } = body;

  const updated = await prisma.sessionInfo.update({
    where: { id: 1 },
    data: { day, timeRange, location },
  });

  return NextResponse.json(updated);
}
