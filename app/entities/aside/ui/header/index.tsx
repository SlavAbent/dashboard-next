import React from "react";
import { Logo } from "@/app/shared/ui/icons/Logo";
import Link from "next/link";

const AsideHeader = () => {
  return (
    <div className="flex items-center py-[22px] px-7">
      <Link href="/">
        <Logo className="w-[28px] h-[24px]" />
      </Link>
      <p className="text-xl ml-3">Venture</p>
    </div>
  );
};

export default AsideHeader;
