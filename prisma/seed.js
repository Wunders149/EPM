const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // 1. Create Admin User
  const password = await hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@epm.org' },
    update: {},
    create: {
      email: 'admin@epm.org',
      name: 'EPM Admin',
      password,
    },
  })

  // 2. Create Session Info
  await prisma.sessionInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      day: 'Sunday',
      timeRange: '03:00 PM – 05:00 PM',
      location: 'American Corner Mahajanga',
    },
  })

  // 3. Create Levels
  const count = await prisma.level.count()
  if (count === 0) {
    const levelsData = [
      {
        name: 'Beginner',
        description: 'For those just starting their English journey.',
        topic: 'Introducing Yourself & Hobbies',
        leaderName: 'Sarah R.',
        leaderBio: 'Passionate about teaching basics.',
        contact: '+261 34 00 000 01'
      },
      {
        name: 'Intermediate',
        description: 'Build confidence in conversation and fluency.',
        topic: 'The Impact of Social Media',
        leaderName: 'Michael T.',
        leaderBio: 'Loves discussing current events.',
        contact: 'fb.com/michael.epm'
      },
      {
        name: 'Upper Intermediate',
        description: 'Refine your skills with debates and advanced grammar.',
        topic: 'Climate Change & Global Solutions',
        leaderName: 'Jessica L.',
        leaderBio: 'Focused on professional English.',
        contact: 'jessica@epm.org'
      },
    ]

    for (const l of levelsData) {
      await prisma.level.create({
        data: {
          name: l.name,
          description: l.description,
          topic: l.topic,
          leader: {
            create: {
              name: l.leaderName,
              bio: l.leaderBio,
              contact: l.contact,
              photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${l.leaderName.replace(' ', '')}`,
            },
          },
        },
      })
    }
  }

  // 4. Create Gallery Items
  const galleryCount = await prisma.galleryItem.count()
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({
      data: [
        { type: 'VIDEO', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'EPM Anthem' }, // Placeholder
        { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1523240715639-963c6a0289cc?w=800', caption: 'Sunday Session - July 2025' },
        { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', caption: 'Group Debate in Action' }
      ]
    })
  }

  // 5. Create Content
  const contentData = [
    { key: 'hero_title', value: 'Elevate Your English at EPM' },
    { key: 'hero_subtitle', value: 'Mahajanga’s vibrant youth-led community for free English practice.' },
    { key: 'about_text', value: 'EPM (English Practice Mahajanga) is a free English learning community based in Mahajanga, Madagascar. Founded on December 1st, 2019 by Malagasy youth, EPM is a nonprofit initiative dedicated to providing free English practice opportunities to students and English lovers.' },
  ]

  for (const c of contentData) {
    await prisma.content.upsert({
      where: { key: c.key },
      update: {},
      create: c,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })