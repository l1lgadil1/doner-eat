import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Starting database seed...');

    // Delete existing records
    console.log('Cleaning existing records...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();

    console.log('Creating menu items...');
    const menuItems = await Promise.all([
      prisma.menuItem.create({
        data: {
          id: '1',
          name: 'Говяжий донер',
          description: 'Традиционный алматинский говяжий донер',
          price: 1995,
          category: 'doner',
          isAvailable: true,
          image: 'https://imageproxy.wolt.com/assets/66331ef8ca8f383e7c8d27c1?w=600'
        }
      }),
      prisma.menuItem.create({
        data: {
          id: '2',
          name: 'Куриный донер',
          description: 'Традиционный алматинский куриный донер',
          price: 1895,
          category: 'doner',
          isAvailable: true,
          image: 'https://imageproxy.wolt.com/assets/66331ef8ca8f383e7c8d27c1?w=600'
        }
      }),
      prisma.menuItem.create({
        data: {
          id: '3',
          name: 'Ассорти донер',
          description: 'Традиционный алматинский ассорти донер',
          price: 1975,
          category: 'doner',
          isAvailable: true,
          image: 'https://imageproxy.wolt.com/assets/66331ef8ca8f383e7c8d27c1?w=600'
        }
      }),
      prisma.menuItem.create({
        data: {
          id: '4',
          name: 'Куриный донер 1.5',
          description: 'Традиционный алматинский куриный донер',
          price: 2695,
          category: 'doner',
          isAvailable: true,
          image: 'https://imageproxy.wolt.com/assets/66331ef8ca8f383e7c8d27c1?w=600'
        }
      }),
      prisma.menuItem.create({
        data: {
          id: '5',
          name: 'Ассорти донер 1.5',
          description: 'Традиционный алматинский ассорти донер',
          price: 2795,
          category: 'doner',
          isAvailable: true,
          image: 'https://imageproxy.wolt.com/assets/66331ef8ca8f383e7c8d27c1?w=600'
        }
      })
    ]);

    const count = await prisma.menuItem.count();
    console.log(`Seeding completed. Created ${count} menu items.`);
    console.log('Menu items:', menuItems);

  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 