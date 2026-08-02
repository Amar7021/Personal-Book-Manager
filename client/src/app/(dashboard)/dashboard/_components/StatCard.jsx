export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <Icon className="size-6" />
        </div>
      </div>
    </div>
  );
}
