'use client';

import type { BoardColumn } from '@/entities/column';
import { Ellipse } from '@/shared/components/ellipse';
import { TypographyP } from '@/shared/components/typography/typographyP';
import { TypographySmall } from '@/shared/components/typography/typographySmall';
import { useCountHook } from '@/shared/hooks/useCountHook';

type BoardColumnRowProps = {
  column: BoardColumn;
};

export const BoardColumnRow = ({ column }: BoardColumnRowProps) => {
  const { completed, incomplete } = useCountHook(column);

  const total = completed + incomplete;
  const completedPercent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Ellipse size={8} color={column.color} />
          <TypographyP text={column.title} className="text-sm" />
        </div>
        <TypographySmall
          text={`${completed}/${total}`}
          className="text-muted-foreground font-normal"
        />
      </div>
      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-full"
          style={{
            width: `${completedPercent}%`,
            backgroundColor: column.color,
          }}
        />
      </div>
    </div>
  );
};
