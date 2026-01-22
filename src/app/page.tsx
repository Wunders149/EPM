import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import SessionSection from '@/components/Home/SessionSection';
import LevelsSection from '@/components/Home/LevelsSection';
import AnnouncementsSection from '@/components/Home/Announcements';

// Revalidate data every 60 seconds (ISR)
export const revalidate = 60;

async function getData() {
  const [content, session, levels, announcements] = await Promise.all([
    prisma.content.findMany(),
    prisma.sessionInfo.findUnique({ where: { id: 1 } }),
    prisma.level.findMany({ include: { leader: true } }),
    prisma.announcement.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } }),
  ]);

  const contentMap = content.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return { contentMap, session, levels, announcements };
}

export default async function Home() {
  const { contentMap, session, levels, announcements } = await getData();

  return (
    <main>
      <Navbar />
      <Hero 
        title={contentMap['hero_title'] || 'Welcome to EPM'} 
        subtitle={contentMap['hero_subtitle'] || 'English Practice Mahajanga'} 
      />
      <AnnouncementsSection announcements={announcements} />
      <SessionSection session={session} />
      <About text={contentMap['about_text'] || ''} />
      <LevelsSection levels={levels} />
      <Footer />
    </main>
  );
}
