function Layout({ children }) {
  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </main>
  );
}

export default Layout;
