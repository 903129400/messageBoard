import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Platform } from './Platform';
@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: '内容' })
    comment: string;

    @Column({ comment: '创建时间' })
    createdAt: Date;

    @Column({ comment: '更新时间' })
    updatedAt: Date;

    @Column({ comment: '评论人' })
     user: string;

    @Column({ comment: '所属话题' })
    topic: string;

    @Column({ comment: '1可见，0已删除' })
    state: number;

    @ManyToOne(_ => Platform, platform => platform.id)
platform: Platform;
}
