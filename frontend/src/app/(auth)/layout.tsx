import { redirect } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
};

export default Layout;