import { BookMarked, BookmarkCheck, Tags } from "lucide-react";

const features = [
  {
    title: "Track Every Book",
    description:
      "Manage your reading list with ease and never lose track of a great book.",
    icon: BookMarked,
  },
  {
    title: "Reading Progress",
    description: "Mark books as Want to Read, Reading, or Completed.",
    icon: BookmarkCheck,
  },
  {
    title: "Smart Organization",
    description:
      "Categorize your collection with tags and quickly filter what matters.",
    icon: Tags,
  },
];

export default function Features() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Built for readers.</h2>

          <p className="mt-3 text-muted-foreground">
            Everything you need to organize your personal library.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-lg bg-muted p-3">
                  <Icon className="size-6" />
                </div>

                <h3 className="text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
