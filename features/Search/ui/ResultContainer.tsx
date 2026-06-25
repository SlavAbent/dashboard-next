import React from 'react';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { Button } from '@/shared/components/Button/button';
import { highLightElement } from '@/features/Search/lib/highLightElement';

type ResultContainerProps<T> = {
  title: string;
  resultData: T[];
  highlight: 'folder' | 'task';
  getLabel: (item: T) => string;
  getId: (item: T) => string;
};

export const ResultContainer = <T,>({
  title,
  resultData,
  highlight,
  getLabel,
  getId,
}: ResultContainerProps<T>) => {
  if (!resultData.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <TypographySmall text={title} />
      <div className="flex flex-col gap-1">
        {resultData.map((item) => {
          const id = getId(item);
          return (
            <Button
              key={id}
              className="gap-2"
              onClick={() =>
                highLightElement(`[data-${highlight}-id="${id}"]`)
              }>
              {getLabel(item)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
