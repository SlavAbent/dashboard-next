import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from '@/app/shared/icons/ui/Search';
import IconWrapper from '@/app/shared/icons/iconWrapper';
import { AvatarDropdown } from '@/components/ui/avatarBadge';
import Weather from '@/app/widgets/Weather';

const Header = () => {
  return (
    <div className="border-bottom flex items-center px-8 py-[15.5]">
      <div className="grow">
        <Input
          placeholder="Search"
          className="min-w-[360px]"
          leftIcon={
            <Search
              size={{
                width: 20,
                height: 20,
              }}
            />
          }
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
