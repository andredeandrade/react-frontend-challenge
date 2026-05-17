import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/features/auth/model';
import { loginSchema, type LoginFormValues } from '@/shared/lib/validation/login-schema';
import { Button } from '@/shared/ui/button';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);
  const authError = useAuthStore((state) => state.error);
  const isLoading = status === 'loading';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await login(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <Field>
        <FieldLabel htmlFor="email">
          E-mail
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email ? (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">
          Senha
        </FieldLabel>
        <PasswordInput
          id="password"
          placeholder="Digite sua senha"
          aria-invalid={Boolean(errors.password)}
          {...register('password')}
        />
        {errors.password ? (
          <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </Field>

      <Button type="submit" className="h-10 w-full" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>

      {authError ? (
        <p className="text-center text-sm text-destructive">{authError}</p>
      ) : null}
    </form>
  );
}