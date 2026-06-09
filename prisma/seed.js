'use strict';

require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('../src/generated/prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12);

  await prisma.adminUser.upsert({
    where: { email: 'admin@terrazola.com' },
    update: {},
    create: {
      email: 'admin@terrazola.com',
      password: hashedPassword,
      name: 'Terrazola Admin',
    },
  });

  const projects = [
    {
      title: 'Vertex Business HQ',
      slug: 'vertex-business-hq',
      category: 'Ticari',
      location: 'İstanbul, Maslak',
      year: 2023,
      area: '8.200 m²',
      description: 'Açık ofis planları ve doğal ışığı ön plana çıkaran modern iş merkezi.',
      coverImage: '/uploads/placeholder-1.jpg',
      images: JSON.stringify(['/uploads/placeholder-1.jpg']),
      featured: true,
      order: 1,
    },
    {
      title: 'Meridian Business Center',
      slug: 'meridian-business-center',
      category: 'Ticari',
      location: 'Ankara, Çankaya',
      year: 2023,
      area: '5.600 m²',
      description: 'Rafine iç mekanları ve akıllı ofis çözümleriyle öne çıkan iş merkezi.',
      coverImage: '/uploads/placeholder-2.jpg',
      images: JSON.stringify(['/uploads/placeholder-2.jpg']),
      featured: true,
      order: 2,
    },
    {
      title: 'Horizon Corporate Tower',
      slug: 'horizon-corporate-tower',
      category: 'Ticari',
      location: 'İzmir, Bayraklı',
      year: 2022,
      area: '12.000 m²',
      description: 'Fonksiyonellik, konfor ve sürdürülebilirliği bir arada sunan kurumsal kule.',
      coverImage: '/uploads/placeholder-3.jpg',
      images: JSON.stringify(['/uploads/placeholder-3.jpg']),
      featured: false,
      order: 3,
    },
    {
      title: 'Lakeview Residences',
      slug: 'lakeview-residences',
      category: 'Konut',
      location: 'İstanbul, Sarıyer',
      year: 2024,
      area: '3.800 m²',
      description: 'Göl manzaralı lüks konut projesi.',
      coverImage: '/uploads/placeholder-4.jpg',
      images: JSON.stringify(['/uploads/placeholder-4.jpg']),
      featured: true,
      order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log('✅ Seed tamamlandı.');
  console.log('📧 Admin: admin@terrazola.com');
  console.log('🔑 Şifre: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());