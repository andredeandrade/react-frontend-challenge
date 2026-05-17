import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model';

import { ProtectedRoute } from './protected-route';

const mockSession = {
  token: 'test-token',
  user: { id: '1', email: 'user@example.com', name: 'Test User' },
};

function renderWithRoutes(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      session: null,
      isAuthenticated: false,
      status: 'idle',
      error: null,
    });
  });

  it('redirects unauthenticated users to /', () => {
    renderWithRoutes('/dashboard');

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument();
  });

  it('renders protected content for authenticated users', () => {
    useAuthStore.setState({
      session: mockSession,
      isAuthenticated: true,
      status: 'authenticated',
      error: null,
    });

    renderWithRoutes('/dashboard');

    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('passes redirect location in state when redirecting', () => {
    let capturedLocation: unknown;

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                Login Page
                <CaptureLocation onCapture={(loc) => (capturedLocation = loc)} />
              </div>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(capturedLocation).toMatchObject({
      from: expect.objectContaining({ pathname: '/dashboard' }),
    });
  });
});

function CaptureLocation({
  onCapture,
}: {
  onCapture: (state: unknown) => void;
}) {
  const { useLocation } = require('react-router-dom') as typeof import('react-router-dom');
  const location = useLocation();

  onCapture(location.state);

  return null;
}
