# prisma-generator-checker

Very tiny/simple generator to check whether you have the latest generated prisma schema or not.

TODO automatically generate prisma schema when it is out of sync

## How to use

just add this:
```
generator prisma_checker {
  provider = "npx prisma-generator-checker"
}
```
to your `schema.prisma`

then 