import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './Comment';
@Entity()
export class Platform {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: '平台名称' })
    platformName: string;

    @Column({ comment: '平台密钥' })
    secretKey: string;
    @OneToMany(_ => Comment, comment => comment.id)
comment: Comment[];
}
