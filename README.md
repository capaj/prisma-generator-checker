# prisma-generator-checker

Very tiny/simple generator to check whether you have the latest generated prisma schema or not.

TODO automatically generate prisma schema when it is out of sync

## How to use

make sure you have `.env` file in your project root folder.

Add this:

```prisma
generator prisma_checker {
  provider = "npx prisma-generator-checker"
}
```

to your `schema.prisma`

then at runtime, you can do

```ts
if (process.env.NODE_ENV !== 'production') {
  // prisma generator checker should not be needed for prod as long as you trust your CI to generate the prisma client correctly
  import('../node_modules/prisma-generator-checker/dist/runtimeChecker')
}
```

this will check sha hash of the schema.prisma file to make sure it matches to the one stored in `.env` when your prisma generation was last executed. If it does not match, it throws an error like this:

```
Error: Prisma schema hash does not match the one in .env, please run prisma generate and commit the changes.
    at Object.<anonymous> (/home/capaj/oss/prisma-generator-checker/packages/generator/src/runtimeChecker.ts:7:11)
    at Module._compile (node:internal/modules/cjs/loader:1155:14)
    at Module.m._compile (/home/capaj/.local/share/pnpm/global/5/.pnpm/ts-node@10.9.1_typescript@4.8.2/node_modules/ts-node/src/index.ts:1618:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1209:10)
    at Object.require.extensions.<computed> [as .ts] (/home/capaj/.local/share/pnpm/global/5/.pnpm/ts-node@10.9.1_typescript@4.8.2/node_modules/ts-node/src/index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1033:32)
    at Function.Module._load (node:internal/modules/cjs/loader:868:12)
    at Module.require (node:internal/modules/cjs/loader:1057:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/capaj/oss/prisma-generator-checker/packages/usage/
```
