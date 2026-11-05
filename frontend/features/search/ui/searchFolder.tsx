import { Button } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import { highLightElement } from '@lib/highlightElement';
import React from 'react';

type SearchFolderProps<T> = {
  title: string;
  resultData: T[];
  highlight: 'folder' | 'task';
  getLabel: (item: T) => string;
  getId: (item: T) => string;
};

export const SearchFolder = <T,>({
  title,
  resultData,
  highlight,
  getLabel,
  getId,
}: SearchFolderProps<T>) => {
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
              onClick={() => {
                highLightElement(`[data-${highlight}-id="${id}"]`);
              }}>
              {getLabel(item)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
