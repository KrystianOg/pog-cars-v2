interface CarsLayoutProps {
  children: React.ReactNode;
  upsert: React.ReactNode;
}
export default function CarsLayout({ upsert, children }: CarsLayoutProps) {
  return (
    <div>
      {children}
      {upsert}
    </div>
  );
}
