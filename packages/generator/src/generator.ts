import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'

import { GENERATOR_NAME } from './constants'

import { readFileSync, writeFileSync } from 'fs'
import { getSchemaHash } from './getSchemaHash'

const { version } = require('../package.json')

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
    
    const dotenv = readFileSync('./.env', 'utf-8')
    const schemaHash = getSchemaHash()
    console.log('schemaHash:', schemaHash)

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
