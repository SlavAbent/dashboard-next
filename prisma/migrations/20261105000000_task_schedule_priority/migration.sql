CREATE TYPE "TaskPriority" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

ALTER TABLE "TaskFolder"
ADD COLUMN "startDate" DATE,
ADD COLUMN "endDate" DATE,
ADD COLUMN "priority" "TaskPriority" NOT NULL DEFAULT 'NONE';

ALTER TABLE "Task"
ADD COLUMN "startDate" DATE,
ADD COLUMN "endDate" DATE,
ADD COLUMN "priority" "TaskPriority" NOT NULL DEFAULT 'NONE';
