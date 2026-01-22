import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import SessionSection from '@/components/Home/SessionSection';
import LevelsSection from '@/components/Home/LevelsSection';
import AnnouncementsSection from '@/components/Home/Announcements';
import GallerySection from '@/components/Home/GallerySection';

export const revalidate = 0;

async function getData() {
  const [content, session, levels, announcements, gallery] = await Promise.all([
    prisma.content.findMany(),
    prisma.sessionInfo.findUnique({ where: { id: 1 } }),
    prisma.level.findMany({ include: { leader: true } }),
    prisma.announcement.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } }),
    prisma.galleryItem.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  const contentMap = content.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return { contentMap, session, levels, announcements, gallery };
}

export default async function Home() {
  const { contentMap, session, levels, announcements, gallery } = await getData();

  return (
    <main style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <Hero 
        title={contentMap['hero_title'] || 'Welcome to EPM'} 
        subtitle={contentMap['hero_subtitle'] || 'English Practice Mahajanga'} 
      />
      <SessionSection session={session} levels={levels} />
      <AnnouncementsSection announcements={announcements} />
      <About text={contentMap['about_text'] || ''} />
      <GallerySection items={gallery} />
      <LevelsSection levels={levels} />
      <Footer />
    </main>
  );
}
