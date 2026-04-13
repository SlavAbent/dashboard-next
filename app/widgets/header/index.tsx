import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from '@/app/shared/icons/ui/Search';
import IconWrapper from '@/app/shared/icons/iconWrapper';

const Header = () => {
  return (
    <div className="border-bottom w-full px-8 py-[15.5]">
      <Input
        placeholder="Search"
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
  );
};

export default Header;
