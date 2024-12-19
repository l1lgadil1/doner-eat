# DonerEat - Система заказа донеров онлайн

## Описание проекта
DonerEat - это современное веб-приложение для заказа донеров с функционалом для клиентов и администраторов. Приложение позволяет клиентам просматривать меню, делать заказы и отслеживать их статус в реальном времени, а администраторам - управлять меню и заказами.

## Основные функции

### Для клиентов:
- 👀 Просмотр меню с фотографиями и описаниями блюд
- 🛒 Оформление заказа без регистрации
- 📍 Отслеживание статуса заказа по ID
- 📱 Адаптивный дизайн для мобильных устройств

### Для администраторов:
- 🔐 Защищенная панель администратора
- 📋 Управление меню (добавление, редактирование, удаление позиций)
- 📊 Управление заказами (просмотр, изменение статуса)
- 📈 Статистика на главной странице админ-панели
- 🔄 Обновление статуса заказов в реальном времени

## Технологический стек

### Frontend:
- ⚛️ Next.js 14 (App Router)
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🎭 Shadcn/ui компоненты
- 🔄 React Server Components
- 📱 Адаптивный дизайн

### Аутентификация:
- 🔑 Client-side аутентификация для админ-панели
- 🍪 Cookies для сохранения сессии
- 🛡️ Защита роутов через middleware

## Структура проекта
```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── menu/
│   │   ├── orders/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── orders/
│   │   └── [id]/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── MenuModal.tsx
│   │   ├── MenuTable.tsx
│   │   ├── OrderStatusBadge.tsx
│   │   ├── OrdersTable.tsx
│   │   └── RecentOrders.tsx
│   ├── checkout/
│   │   └── CheckoutModal.tsx
│   ├── home/
│   │   └── MenuSection.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── ui/
│       └── shadcn компоненты
│
├── hooks/
│   ├── use-menu.ts
│   └── use-orders.ts
│
├── lib/
│   ├── api/
│   │   ├── menu.ts
│   │   └── orders.ts
│   └── mock-data.ts
│
├── providers/
│   └── AuthProvider.tsx
│
└── types/
    └── order.ts
```

## Аутентификация администратора

### Учетные данные по умолчанию:
```
Email: admin@admin
Password: admin123
```

## Установка и запуск

### Требования
- Node.js 18+
- npm или yarn
- PostgreSQL 14+ (для сервера)

### Шаги установки

#### Быстрый старт

Проект использует Makefile для упрощения запуска. Доступны следующие команды:

```bash
# Установить все за��исимости (клиент + сервер)
make install

# Запустить клиент и сервер в режиме разработки
make dev

# Остановить все серверы разработки
make stop

# Очистить проект (удалить node_modules и артефакты сборки)
make clean

# Показать список доступных команд
make help
```

> **Примечание**: Для остановки серверов разработки вы можете:
> 1. Использовать команду `make stop`
> 2. Нажать `Ctrl + C` в терминале, где запущены серверы

#### Frontend:

1. Клонировать репозиторий
```bash
git clone https://github.com/your-username/doner-eat.git
cd doner-eat
```

2. Установить зависимости
```bash
npm install
# или
yarn install
```

3. Создать файл .env.local и добавить переменные окружения (3001 порт дефолтный для бэка)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001 
```

4. Запустить приложение
```bash
npm run dev
# или
yarn dev
# или через concurrently
npm run dev:all
```

Frontend будет доступен по адресу `http://localhost:3000`

#### Backend:

1. Перейти в директорию сервера
```bash
cd server
```

2. Установить зависимости
```bash
npm install
# или
yarn install
```


3. Настроить базу данных
```bash
# Создать базу данных
npx prisma db push

# Заполнить начальными данными (опционально)
npm run seed
```

4. Запустить сервер
```bash
npm run dev
# или
yarn dev
```

Backend API будет доступен по адресу `http://localhost:3001`

### Доступн��е команды

#### Frontend:
```bash
# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск собранного проекта
npm start

# Проверка типов TypeScript
npm run typecheck

# Линтинг
npm run lint
```

#### Backend:
```bash
# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск в production режиме
npm start

# Применить миграции
npm run db:migrate

# Заполнить базу тестовыми данными
npm run db:seed

# Сбросить базу данных
npm run db:reset
```

## Структура базы данных

### Основные таблицы:

```prisma
model MenuItem {
  id          String      @id @default(cuid())
  name        String
  description String
  price       Float
  image       String?
  category    String
  isAvailable Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  OrderItem   OrderItem[]
}

model Order {
  id           String      @id @default(cuid())
  status       OrderStatus @default(PENDING)
  customerName String
  phoneNumber  String
  totalAmount  Float
  items        OrderItem[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

model OrderItem {
  id         String   @id @default(cuid())
  quantity   Int
  menuItem   MenuItem @relation(fields: [menuItemId], references: [id])
  menuItemId String
  order      Order    @relation(fields: [orderId], references: [id])
  orderId    String
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  COMPLETED
  CANCELLED
}
```




