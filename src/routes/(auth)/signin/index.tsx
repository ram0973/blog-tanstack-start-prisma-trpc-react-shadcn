import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth-client';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import css from './login.module.css';

export const Route = createFileRoute('/(auth)/signin/')({
  component: LoginForm,
});

const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
});

function LoginForm() {
  const { redirectUrl, queryClient } = Route.useRouteContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    signIn.email(
      {
        email,
        password,
        callbackURL: redirectUrl,
      },
      {
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
          setIsLoading(false);
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['user'] });
          navigate({ to: redirectUrl });
        },
      },
    );
  };

  return (
    // <div className={css.login_form_container}>
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={'text-center'}>
        <div className={css.logo} />
        <h1>Welcome back to Acme Inc.</h1>
      </div>

      <div className={css.field}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="hello@example.com"
          readOnly={isLoading}
          required
        />
      </div>

      <div className={css.field}>
        <Label htmlFor="password">Password</Label>
        <Input
          className={css.input}
          id="password"
          name="password"
          type="password"
          placeholder="Enter password here"
          readOnly={isLoading}
          required
        />
      </div>

      <div className={css.field}>
        <Button variant="default" type="submit" disabled={isLoading}>
          {isLoading && <LoaderCircle className="animate-spin" />}
          {isLoading ? 'Sign in...' : 'Sign in'}
        </Button>
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full" onClick={(e)=>{e.preventDefault(); console.info(JSON.stringify(import.meta.env)); signIn.social({provider: "github"})}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>

        <Button variant="outline" className="w-full" onClick={(e)=>{e.preventDefault(); console.dir(import.meta.env); signIn.social({provider: "google"})}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>

        <Button variant="outline" className="w-full" onClick={(e)=>{e.preventDefault(); console.dir(JSON.stringify(import.meta.env)); signIn.social({provider: "vk"})}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with VK
        </Button>

      {errorMessage && <span className="css.error_message">{errorMessage}</span>}

      <div className={'text-center'}>
        Don't have an account?{' '}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
    // </div>
  );
}
