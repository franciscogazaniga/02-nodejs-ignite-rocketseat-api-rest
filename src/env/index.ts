import { config } from 'dotenv'
import { z } from 'zod'

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'test') {
  console.log('ENTROU NO AMBIENTE DE TESTE')
  config({ path: '.env.test' })
} else {
  console.log('AMBIENTE DE PRODUÇÃO')
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

console.log(process.env.DATABASE_URL, process.env.NODE_ENV)

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
