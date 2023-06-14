import 'dotenv/config'
import { checkPrismaSchemaHash } from '../generator/src/checkPrismaSchemaHash'
checkPrismaSchemaHash().then((hash) => {
  console.log(`checked and matched ${hash}`)
})
