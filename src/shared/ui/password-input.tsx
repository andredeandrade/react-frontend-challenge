import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group';

type PasswordInputProps = React.ComponentProps<'input'>

export function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        type={isVisible ? 'text' : 'password'}
        className={cn(className)}
        {...props}
      />
      <InputGroupAddon
        align="inline-end"
        className="px-1 data-[align=inline-end]:border-l-0"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
