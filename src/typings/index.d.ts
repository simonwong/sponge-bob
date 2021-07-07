import { utilFn } from '../middleware'

interface KoaContextStateUser {
  id: string
  email?: string
}

interface KoaContextState {
  user: KoaContextStateUser
}

interface KoaContextJOI {
  validateBody: (schema: any) => void
}

declare module 'koa' {
  interface BaseContext {
    util: typeof utilFn
    joi: KoaContextJOI
    state: KoaContextState
  }
}
