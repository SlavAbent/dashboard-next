import Aside from '@/entities/aside/ui';
import Header from '@/widgets/header';

export default function Tasks() {
  return (
    <div className="flex h-screen max-w-full">
      <Aside />
      <div className="flex w-full flex-col">
        <Header />
      </div>
      <div></div>
      {/*<Tasks />*/}
    </div>
  );
}
