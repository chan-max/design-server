import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OrganizationModule } from 'src/organization/organization.module';
import { RoleModule } from 'src/role/role.module';
import { CustomModel } from 'src/custom_model/entities/custom_model.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,CustomModel]), OrganizationModule, RoleModule,CustomModel],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
