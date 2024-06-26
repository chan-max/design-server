import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { FileModule } from './file/file.module';
import { ProductModelModule } from './product_model/product_model.module';
import { ImageModule } from './image/image.module';
import { StickerModule } from './sticker/sticker.module';
import { CustomModelModule } from './custom_model/custom_model.module';


// 环境配置信息
import envConfig from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(envConfig.DATABASE_CONFIG),
    UserModule,
    OrganizationModule,
    AuthModule,
    MenuModule,
    RoleModule,
    FileModule,
    ProductModelModule,
    ImageModule,
    StickerModule,
    CustomModelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
