export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Personal Book Manager
        </p>
      </div>
    </footer>
  );
}
