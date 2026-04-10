"use server";

import React from "react";
import { getFolders } from "@/app/widgets/folders/_api";
import FoldersCreate from "@/app/widgets/folders/ui/FoldersCreate";

const Folders = async () => {
  const foldersData = await getFolders();

  return <FoldersCreate data={foldersData} />;
};

export default Folders;
