import { readFileSync } from 'fs'
import crypto from 'crypto'

export function getSchemaHash() {
  const prismaSchema = readFileSync('./prisma/schema.prisma', 'utf-8')

  const prismaSchemaHash = crypto
    .createHash('sha256')
    .update(prismaSchema)
    .digest('hex')
  return prismaSchemaHash
}
