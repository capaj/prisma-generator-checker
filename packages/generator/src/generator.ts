import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'

import { existsSync, readFileSync, writeFileSync } from 'fs'
import { getSchemaHash } from './getSchemaHash'

const { version } = require('../package.json')

const GENERATOR_NAME = 'prisma-generator-checker'

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    const dotenvExists = existsSync('./.env')
    if (!dotenvExists) {
      logger.warn('No .env file found, skipping')
      return
    }

    const dotenv = readFileSync('./.env', 'utf-8')
    const schemaHash = await getSchemaHash()

    if (!dotenv.includes('PRISMA_CURRENT_SCHEMA_HASH')) {
      writeFileSync(
        './.env',
        `${dotenv}\nPRISMA_CURRENT_SCHEMA_HASH=${schemaHash}`
      )
    } else {
      writeFileSync(
        './.env',
        dotenv.replace(
          /PRISMA_CURRENT_SCHEMA_HASH=(.*)/,
          `PRISMA_CURRENT_SCHEMA_HASH=${schemaHash}`
        )
      )
    }
  }
})
