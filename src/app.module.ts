import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { uploadConfig } from './config/upload';
import DiskStorageProvider from './shared/providers/StorageProvider/implementations/DiskStorageProvider';
import { UsersModule } from './users/users.module';

const providers = {
  disk: DiskStorageProvider,
};
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'StorageProvider',
      useValue: providers[uploadConfig.driver],
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {
    console.log('STATUS CONNECTION', connection.isConnected);
  }
}
