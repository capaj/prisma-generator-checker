# prisma-generator-checker

Very tiny/simple generator to check whether you have the latest generated prisma schema or not.

TODO automatically generate prisma schema when it is out of sync

## How to use

make sure you have `.env` file in your project.

Add this:

```
generator prisma_checker {
  provider = "npx prisma-generator-checker"
}
```

to your `schema.prisma`

then at runtime, you can do

```
import('../node_modules/prisma-generator-checker/dist/runtimeChecker')
```

this will check sha hash of the schema.prisma file to make sure it matches to when your prisma generation was last executed.
