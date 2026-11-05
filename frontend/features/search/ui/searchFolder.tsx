import { Button } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import { highLightElement } from '@lib/highlightElement';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type SearchFolderProps<T> = {
  title: string;
  resultData: T[];
  highlight: 'folder' | 'task';
  getLabel: (item: T) => string;
  getId: (item: T) => string;
  getHref: (id: string) => string;
};

export const SearchFolder = <T,>({
  title,
  resultData,
  highlight,
  getLabel,
  getId,
  getHref,
}: SearchFolderProps<T>) => {
  const pathname = usePathname();
  const router = useRouter();

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
                const href = getHref(id);
                const targetPath = href.split('?')[0];

                if (pathname !== targetPath) {
                  router.push(href);
                  return;
                }

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
