import 'egg'
import { Repository, Connection } from 'typeorm'
import Comment from '../app/entity/Comment'
import Platform from '../app/entity/Platform'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      Comment: any
      Platform: any
    }
    repo: {
      Comment: Repository<Comment>
      Platform: Repository<Platform>
    }
  }
}
