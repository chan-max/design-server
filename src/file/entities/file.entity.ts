
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
    OneToOne,
    JoinColumn,
    BeforeUpdate,
} from 'typeorm';
const bcrypt = require('bcryptjs');

@Entity('file')
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 200 })
    url: string; // 文件路径

    @Column({ length: 100, default: '', nullable: true })
    name: string; //文件类型

    @Column({ length: 100, default: '', nullable: true })
    rawName: string; // 文件原始名称

    @Column({ length: 100, default: '', nullable: true })
    type: string; //文件类型

    @Column({ length: 100, default: '', nullable: true })
    thumbnail: string; // 缩略图

    @Column({ length: 100, default: '', nullable: true })
    description: string; // 描述

    @Column({ length: 100, default: '', nullable: true })
    tags: string; // 描述

    @Column({  nullable: true ,type:'json'})
    meta: any; // 元数据

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
}