'use strict';

require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('../src/generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
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
      location: 'Istanbul, Maslak',
      year: 2023,
      area: '8.200 m2',
      description: 'Acik ofis planlari ve dogal isigi on plana cikaran modern is merkezi.',
      coverImage: '/uploads/placeholder-1.jpg',
      images: JSON.stringify(['/uploads/placeholder-1.jpg']),
      featured: true,
      order: 1,
    },
    {
      title: 'Meridian Business Center',
      slug: 'meridian-business-center',
      category: 'Ticari',
      location: 'Ankara, Cankaya',
      year: 2023,
      area: '5.600 m2',
      description: 'Rafine ic mekanlari ve akilli ofis cozumleriyle one cikan is merkezi.',
      coverImage: '/uploads/placeholder-2.jpg',
      images: JSON.stringify(['/uploads/placeholder-2.jpg']),
      featured: true,
      order: 2,
    },
    {
      title: 'Horizon Corporate Tower',
      slug: 'horizon-corporate-tower',
      category: 'Ticari',
      location: 'Izmir, Bayraki',
      year: 2022,
      area: '12.000 m2',
      description: 'Fonksiyonellik, konfor ve surdurulebilirligi bir arada sunan kurumsal kule.',
      coverImage: '/uploads/placeholder-3.jpg',
      images: JSON.stringify(['/uploads/placeholder-3.jpg']),
      featured: false,
      order: 3,
    },
    {
      title: 'Lakeview Residences',
      slug: 'lakeview-residences',
      category: 'Konut',
      location: 'Istanbul, Sarıyer',
      year: 2024,
      area: '3.800 m2',
      description: 'Gol manzarali luks konut projesi.',
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

  const settings = [
    { key: 'hero_video_url', value: '' },
    { key: 'hero_image_url', value: '' },
    { key: 'hero_title', value: 'Guven Uzerine Insa Edilmis.' },
    { key: 'hero_subtitle', value: 'Konut ve ticari projelerde detaya olan bagliligimiz ile yuksek kaliteli yapilar teslim ediyoruz.' },
    { key: 'about_title', value: 'Insaati Bir Sanat Olarak Goruyoruz.' },
    { key: 'about_text', value: '2010 yilinda Istanbulda kurulan Ozkur Insaat, konut ve ticari insaat alaninda kalite ve guvenilirligin sembolu haline geldi.' },
    { key: 'contact_phone', value: '+90 212 000 00 00' },
    { key: 'contact_email', value: 'info@ozkurinsaat.com' },
    { key: 'contact_address', value: 'Istanbul, Turkiye' },
    { key: 'stat_1_value', value: '10+' },
    { key: 'stat_1_label', value: 'Yil Deneyim' },
    { key: 'stat_2_value', value: '120+' },
    { key: 'stat_2_label', value: 'Tamamlanan Proje' },
    { key: 'stat_3_value', value: '85K+' },
    { key: 'stat_3_label', value: 'Insaat Alani m2' },
    { key: 'stat_4_value', value: '5/5' },
    { key: 'stat_4_label', value: 'Musteri Memnuniyeti' },
    { key: 'footer_phone', value: '+90 212 000 00 00' },
    { key: 'footer_email', value: 'info@ozkurinsaat.com' },
    { key: 'footer_address', value: 'Istanbul, Turkiye' },
    { key: 'footer_tagline', value: 'Guven - Kalite - Mukemmellik' },
  ];

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log('Seed tamamlandi.');
  console.log('Admin: admin@terrazola.com');
  console.log('Sifre: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());