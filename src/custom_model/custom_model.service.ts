import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IPageResult, Pagination, } from 'src/utils/pagination';
import { createQueryCondition } from 'src/utils/utils';
import { InjectRepository, } from '@nestjs/typeorm';
import { CustomModel } from './entities/custom_model.entity';
import { BasicService } from 'src/common/basicService';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CustomModelService extends BasicService {

  constructor(
    @InjectRepository(CustomModel)
    private customModelRepository,
    @InjectRepository(User)
    private userRepository,
  ) {
    super()
  }

  async create(post) {
    return await this.customModelRepository.save(post);
  }


  findAll() {
    return `This action returns all `;
  }

  findOne(id: number) {
    return `This action returns a #${id} `;
  }

  async update(post) {
    const item = await this.customModelRepository.findOne(post.id);
    Object.assign(item, post);
    return this.customModelRepository.save(item);
  }

  async remove(id) {
    return this.customModelRepository.delete(id)
  }

  async getPage(post, userInfo) {

    if (post.myUploads && !userInfo) {
      throw new UnauthorizedException('请登录');
    }

    const where = null
    const queryBuilderName = 'customModel'

    function queryBuilderHook(qb) {
      qb
        .leftJoinAndSelect('CustomModel.uploader', 'user')
        .select([
          "CustomModel.id",
          "CustomModel.name",
          "CustomModel.createTime",
          "CustomModel.updateTime",
          "CustomModel.thumbnail",
          "CustomModel.thumbnails",
          "CustomModel.description",
          "CustomModel.isPublic",
          "CustomModel.keywords",
          "CustomModel.meta",
          "user.name",
          "user.account",
          "user.email",
          "user.avatar",
          "user.isAdmin",
        ]).orderBy('CustomModel.createTime', 'DESC')

      // if (post.type) {
      //   qb.where('customModel.type IN (:...types)', { types: post.type.split(',') })
      // }

      if (post.myUploads) {
        qb.where('CustomModel.uploaderId = :uploaderId', { uploaderId: userInfo.id })
      }

    }





    return await this.getPageFn({
      queryBuilderHook,
      queryBuilderName,
      post,
      where,
      repo: this.customModelRepository
    })
  }
}
