import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../../configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type:'postgres' as 'postgres',
        host: configService.get<'string'>('TYPEORM_HOST'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        port: configService.get<number>('TYPEORM_PORT'),
        entities: [User],
        synchronize: false,
        autoLoadEntities: true,
      })
    }), ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations]
    }),
    UserModule,
  AuthModule,
  TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
