import { utilFn } from '../middleware'

interface KoaContextStateUser {
  id: string
  email?: string
}

interface KoaContextState {
  user: KoaContextStateUser
}

declare module 'koa' {
  interface BaseContext {
    util: typeof utilFn
    state: KoaContextState
  }
}
