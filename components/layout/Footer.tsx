export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted">
        <p className="font-display text-base text-ink">NEIVCE Trading PLT</p>
        <p>B5 - B7, Block B, Jalan TKS 1, Taman Kajang Sentral, 43000 Kajang, Selangor</p>
        <p>03-8737 8770</p>
        <p className="mt-4 text-xs">
          &copy; {new Date().getFullYear()} NEIVCE Trading PLT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
