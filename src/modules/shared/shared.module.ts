import { Module } from '@nestjs/common';
import { storageConfig } from 'src/config/storage';
import DiskStorageProvider from './providers/StorageProvider/implementations/disk-storage.provider';

const providers = {
  disk: DiskStorageProvider,
};

@Module({
  providers: [
    {
      provide: 'StorageProvider',
      useClass: providers[storageConfig.provider],
    },
  ],

  exports: ['StorageProvider'],
})
export class SharedModule {}
