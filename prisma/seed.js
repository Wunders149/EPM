const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // 1. Create Admin User
  const password = await hash('admin123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@epm.org' },
    update: {},
    create: {
      email: 'admin@epm.org',
      name: 'EPM Admin',
      password,
    },
  })
  console.log({ user })

  // 2. Create Session Info
  const session = await prisma.sessionInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      day: 'Sunday',
      timeRange: '03:00 PM – 05:00 PM',
      location: 'American Corner Mahajanga',
    },
  })
  console.log({ session })

  // 3. Create Levels
  // Check if levels exist to avoid duplicates if re-running
  const count = await prisma.level.count()
  if (count === 0) {
    const levelsData = [
      {
        name: 'Beginner',
        description: 'For those just starting their English journey. Focus on basic vocabulary and simple sentences.',
        leaderName: 'Sarah R.',
        leaderBio: 'Passionate about teaching basics.',
      },
      {
        name: 'Intermediate',
        description: 'Build confidence in conversation. Focus on fluency and expanding vocabulary.',
        leaderName: 'Michael T.',
        leaderBio: 'Loves discussing current events.',
      },
      {
        name: 'Upper Intermediate',
        description: 'Refine your skills. specific topics, debates, and advanced grammar.',
        leaderName: 'Jessica L.',
        leaderBio: 'Focused on professional English.',
      },
    ]

    for (const l of levelsData) {
      const level = await prisma.level.create({
        data: {
          name: l.name,
          description: l.description,
          leader: {
            create: {
              name: l.leaderName,
              bio: l.leaderBio,
              photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${l.leaderName.replace(' ', '')}`,
            },
          },
        },
      })
      console.log(`Created level: ${level.name}`)
    }
  } else {
    console.log('Levels already exist.')
  }

  // 4. Create Content
  const contentData = [
    { key: 'hero_title', value: 'Speak English with Confidence' },
    { key: 'hero_subtitle', value: 'Join the premier English learning community in Mahajanga.' },
    { key: 'about_text', value: 'EPM (English Practice Mahajanga) is a free English learning community based in Mahajanga, Madagascar. Founded on December 1st, 2019 by Malagasy youth, EPM is a nonprofit initiative dedicated to providing free English practice opportunities to students and English lovers.' },
    { key: 'why_join_text', value: 'Free sessions, supportive community, and expert guidance. Join us to unlock your potential.' },
  ]

  for (const c of contentData) {
    await prisma.content.upsert({
      where: { key: c.key },
      update: {},
      create: c,
    })
  }
  console.log('Content seeded.')
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
