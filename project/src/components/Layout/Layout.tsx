import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  user?: any;
  onSignOut?: () => void;
}

export default function Layout({ children, user, onSignOut }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onSignOut={onSignOut} />
      <main>{children}</main>
    </div>
  );
}