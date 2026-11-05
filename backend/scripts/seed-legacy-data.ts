import nextEnv from '@next/env';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const { prisma } = await import('../../lib/prisma.ts');

const demoUserId = 'legacy-demo-user';
const messages = [
  ['msg-1', 'Привет! Как продвигается спринт?', '2026-05-27T09:01:56.663Z'],
  ['pRxzb7Qu9O8', '123', '2026-06-30T11:26:10.702Z'],
  ['WYlUMbq1fRs', '123', '2026-06-30T11:26:15.672Z'],
  ['rpxLkSymMVA', '324234', '2026-06-30T11:31:12.146Z'],
  ['gtOLvZ_yx0Y', '2534535', '2026-06-30T11:33:29.586Z'],
  ['pLnocniTjaM', 'цйуйцу', '2026-10-02T13:26:26.499Z'],
  ['TyY4JAN1g-A', '123', '2026-10-05T13:49:08.741Z'],
  ['SkujZD6XrDY', '123123', '2026-10-06T13:19:50.672Z'],
  ['_mlTEqGAPkA', 'rere', '2026-10-06T13:27:47.350Z'],
  ['m6_dUY_G9X4', '23423', '2026-10-06T13:29:17.187Z'],
  ['K9q23y5cpC0', '234234', '2026-10-06T13:32:44.632Z'],
  ['uhVfcebJEHI', '56775675', '2026-10-06T13:33:50.027Z'],
  ['OshCrBkqhTI', '234234234243', '2026-10-06T13:34:24.806Z'],
  ['rQFtw_-LrgY', '456456', '2026-10-06T13:34:28.341Z'],
  ['rja0pT2IdfU', '123123tertetert', '2026-10-13T17:17:03.963Z'],
] as const;

await prisma.$transaction(async (tx) => {
  await tx.user.upsert({
    where: { id: demoUserId },
    create: { id: demoUserId, name: 'Svyatoslav Abent' },
    update: { name: 'Svyatoslav Abent' },
  });

  for (const [id, text, createdAt] of messages) {
    await tx.message.upsert({
      where: { id },
      create: { id, text, createdAt: new Date(createdAt), userId: demoUserId },
      update: {},
    });
  }
});

await prisma.$disconnect();
