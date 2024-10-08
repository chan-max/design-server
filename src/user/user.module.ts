import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Relation } from './entities/relation.entity';
import { CustomModel } from 'src/custom_model/entities/custom_model.entity';
import { Company } from 'src/company/entities/company.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, CustomModel, Relation, Company]), CustomModel],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
