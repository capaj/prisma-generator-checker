import { getSchemaHash } from './getSchemaHash'

if (process.env.NODE_ENV !== 'production') {
  const prismaSchemaHash = getSchemaHash()

  if (prismaSchemaHash !== process.env.PRISMA_CURRENT_SCHEMA_HASH) {
    throw new Error(
      'Prisma schema hash does not match the one in .env, please run prisma generate and commit the changes.'
    )
  }
}
