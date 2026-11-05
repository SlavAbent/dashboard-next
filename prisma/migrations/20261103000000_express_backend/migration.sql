-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BoardColumn" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    CONSTRAINT "BoardColumn_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TaskFolder" (
    "id" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "TaskFolder_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskFolderId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tags" TEXT[],
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "order" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Board_userId_key" ON "Board"("userId");
CREATE UNIQUE INDEX "BoardColumn_boardId_key_key" ON "BoardColumn"("boardId", "key");
CREATE INDEX "BoardColumn_boardId_order_idx" ON "BoardColumn"("boardId", "order");
CREATE INDEX "TaskFolder_columnId_order_idx" ON "TaskFolder"("columnId", "order");
CREATE INDEX "Task_taskFolderId_order_idx" ON "Task"("taskFolderId", "order");
CREATE INDEX "Message_userId_idx" ON "Message"("userId");
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

ALTER TABLE "Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BoardColumn" ADD CONSTRAINT "BoardColumn_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TaskFolder" ADD CONSTRAINT "TaskFolder_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "BoardColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskFolderId_fkey" FOREIGN KEY ("taskFolderId") REFERENCES "TaskFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
