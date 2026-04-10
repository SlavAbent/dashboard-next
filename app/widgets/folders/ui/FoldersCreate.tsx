'use client';

type Folder = {
  id: string | number;
  name: string;
  // другие поля...
};

type Props = {
  data: Folder[];
};

const FoldersCreate = ({ data }: Props) => {
  const handleClickToFolder = (folderId: string | number) => {
    console.log('Clicked folder:', folderId);
  };

  return (
    <div>
      {data.map((folder) => (
        <div key={folder.id} onClick={() => handleClickToFolder(folder.id)}>
          {folder.name}
        </div>
      ))}
    </div>
  );
};

export default FoldersCreate;
