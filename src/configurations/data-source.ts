import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/user.entity"
import { ConfigService } from "@nestjs/config"
import './dotenv'
import * as path from 'path'

const entitiesPath = path.join(__dirname, '..', 'models/**/*.entity.ts');

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configService.get<string>('TYPEORM_HOST'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  port: configService.get<number>('TYPEORM_PORT'),
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ["*.ts"],
  subscribers: [],
})
