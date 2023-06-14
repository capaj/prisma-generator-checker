import { getSchemaHash } from './getSchemaHash'

export async function checkPrismaSchemaHash() {
  const prismaSchemaHash = await getSchemaHash()

  if (prismaSchemaHash !== process.env.PRISMA_CURRENT_SCHEMA_HASH) {
    throw new Error(
      'Prisma schema hash does not match the one in .env, please run prisma generate and commit the changes.'
    )
  }
  return prismaSchemaHash
}
