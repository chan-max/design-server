import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  BeforeUpdate,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Exclude } from 'class-transformer';
const bcrypt = require('bcryptjs');
import { Sticker } from 'src/sticker/entities/sticker.entity';
import { File } from 'src/file/entities/file.entity';
import { CustomModel } from 'src/custom_model/entities/custom_model.entity';
import { Company } from 'src/company/entities/company.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  account: string; // 用户名

  @Column({ length: 100, default: '', nullable: true })
  name: string; //昵称

  @Column({ type: 'bigint', nullable: true })
  phone: number; // 手机号

  @Column({ type: 'boolean', nullable: true })
  sex: number; // 性别 1:男 0:女

  @Column({ nullable: true })
  birthday: Date; // 出生日期

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true, type: 'boolean' })
  isAdmin: boolean;

  @Column({ nullable: true }) // 表示查询时隐藏此列
  @Exclude() // 返回数据时忽略password，配合ClassSerializerInterceptor使用
  password: string; // 密码

  // @Exclude()
  @Column({ nullable: true, type: 'json' }) // 表示查询时隐藏此列
  meta: JSON; // 密码

  @Column({ default: '', nullable: true })
  avatar: string; //头像

  @Column({ default: '', nullable: true })
  email: string;


  

  @OneToMany(() => Sticker, sticker => sticker.uploader)
  stickers: Sticker[];

  @OneToMany(() => File, file => file.uploader)
  files: File[];


  @OneToMany(() => CustomModel, customModel => customModel.uploader)
  customModels: CustomModel[];

  @Column({ default: null, nullable: true })
  companyId: string; //关联的公司

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }


  // 秘文存储密码 
  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
