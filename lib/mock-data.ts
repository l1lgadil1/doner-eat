export const ADMIN_CREDENTIALS = {
  email: 'admin@admin',
  password: 'admin123'
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN';
};

export const MOCK_ADMIN_USER: User = {
  id: '1',
  email: ADMIN_CREDENTIALS.email,
  name: 'Admin',
  role: 'ADMIN'
}; 