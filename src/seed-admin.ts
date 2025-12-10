import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from './core/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'game_db',
  entities: [User],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await repo.findOne({ where: { username } });
  if (!existing) {
    const bcrypt = await import('bcrypt');
    const hashed = await bcrypt.hash(password, 10);
    const user = repo.create({ username, password: hashed, role: 'admin' });
    await repo.save(user);
    console.log('Admin created', username);
  } else {
    console.log('Admin exists');
  }
  await AppDataSource.destroy();
}
seed();
