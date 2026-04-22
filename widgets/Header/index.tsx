import React from 'react';
import { Input } from '@/shared/ui/input';
import { SearchIcon } from '@/shared/icons/ui/SearchIcon';
import IconWrapper from '@/shared/icons/iconWrapper';
import { AvatarDropdown } from '@/shared/ui/avatarBadge';
import Weather from '@/widgets/Weather';
import { iconSize } from '@/shared/icons/iconSize';

const Header = () => {
  return (
    <div className="border-bottom flex items-center px-8 py-[15.5]">
      <div className="grow">
        <Input
          placeholder="SearchIcon"
          className="min-w-[360px]"
          leftIcon={<SearchIcon size={iconSize(20)} />}
          rightIcon={
            <div className="flex items-center gap-2">
              <IconWrapper className="bg-[#D8D8D8]">⌘</IconWrapper>
              <IconWrapper className="bg-[#F2F2F2]">F</IconWrapper>
            </div>
          }
        />
      </div>
      <div className="flex items-center">
        <Weather className="mr-4 cursor-pointer" />
        <AvatarDropdown
          src=""
          name="Abent S."
          separator
          footer={[
            {
              id: 1,
              title: 'Log out',
            },
          ]}
          options={[
            {
              id: 1,
              title: 'Profile',
            },
            {
              id: 2,
              title: 'Billing',
            },
            {
              id: 3,
              title: 'Settings',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Header;
