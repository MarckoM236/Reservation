import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client'; 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(ConfigService: ConfigService) {
    //conection pool configuration for MariaDB
    const pool = {
      host: ConfigService.get('DB_HOST'),
      port: ConfigService.get('DB_PORT'),
      user: ConfigService.get('DB_USER'),
      password: ConfigService.get('DB_PASSWORD'),
      database: ConfigService.get('DB_DATABASE'),
      connectionLimit: 5,
    };

    const adapter = new PrismaMariaDb(pool);

    //send the adapter to the PrismaClient constructor
    super({ adapter });
  }

  async onModuleInit() {
    //Conect to the database when the module initializes
    await this.$connect();
  }

  async onModuleDestroy() {
    //Disconnect from the database when the module is destroyed
    await this.$disconnect();
  }
}