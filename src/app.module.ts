import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ResourceModule } from './resource/resource.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    ResourceModule
  ],
})
export class AppModule {}
