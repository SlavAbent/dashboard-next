import React from "react";
import Folders from "@/app/widgets/folders/ui";
import AsideHeader from "@/app/entities/aside/ui/header";

const Aside = () => {
  return (
    <div>
      <AsideHeader />
      <Folders />
    </div>
  );
};

export default Aside;
