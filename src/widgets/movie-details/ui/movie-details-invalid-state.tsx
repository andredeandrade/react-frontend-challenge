import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

type MovieDetailsInvalidStateProps = {
  message?: string;
};

export function MovieDetailsInvalidState({
  message = 'Filme invalido.',
}: MovieDetailsInvalidStateProps) {
  const navigate = useNavigate();

  return (
    <section className="space-y-4 px-5 py-5">
      <p className="text-sm text-destructive">{message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="size-4" />
        Voltar
      </Button>
    </section>
  );
}
