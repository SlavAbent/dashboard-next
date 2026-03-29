import React from 'react';
import Logo from "@/app/_components/Logo";
import Folders from "@/app/_components/Folders";

const Aside = () => {
    return (
        <div className="flex flex-col">
            <Logo />
            <Folders />
        </div>
    );
};

export default Aside;