import crypto from 'crypto'
import { readFile } from 'fs/promises'

export async function getSchemaHash() {
  const prismaSchema = await readFile('./prisma/schema.prisma', 'utf-8')

  const prismaSchemaHash = crypto
    .createHash('sha256')
    .update(prismaSchema)
    .digest('hex')
  return prismaSchemaHash
}
