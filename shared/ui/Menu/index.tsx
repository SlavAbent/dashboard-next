import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MenuProps } from '@/shared/ui/Menu/types';

export const Menu = ({
  label,
  open,
  icon,
  onOpenChange,
  options,
  onSelect,
}: MenuProps) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-sm border border-black px-3 py-1">
        {icon}
        {label}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => onSelect?.(option)}>
              {option.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
