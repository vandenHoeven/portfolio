import type { TimelineEntry } from "@/data/site/timeline";

type HorizontalTimelineProps = {
  entries: TimelineEntry[];
};

const START_YEAR = 2019;
const END_YEAR = 2026;
const YEAR_SPAN = END_YEAR - START_YEAR;
const ROW_HEIGHT = 40;
const MIN_WIDTH = 100 / YEAR_SPAN / 2;

function effectiveEndYear(entry: TimelineEntry) {
  if (entry.endLabel) return END_YEAR;
  return entry.endYear ?? entry.startYear;
}

function toFraction(year: number, month = 1) {
  return year - START_YEAR + (month - 1) / 12;
}

function entryPosition(entry: TimelineEntry) {
  const endYear = effectiveEndYear(entry);
  const visibleStartYear = Math.max(entry.startYear, START_YEAR);

  if (entry.startMonth != null || entry.endMonth != null) {
    const startFrac = toFraction(visibleStartYear, entry.startMonth ?? 1);
    const endFrac = toFraction(endYear, entry.endMonth ?? 12);
    let width = Math.max(((endFrac - startFrac) / YEAR_SPAN) * 100, MIN_WIDTH);
    let left = (startFrac / YEAR_SPAN) * 100;

    if (left + width > 100) {
      left = 100 - width;
    }

    if (entry.offsetLeft) {
      left = Math.max(0, left + entry.offsetLeft);
    }

    return { left, width };
  }

  let left = ((visibleStartYear - START_YEAR) / YEAR_SPAN) * 100;
  const width = Math.max(((endYear - visibleStartYear) / YEAR_SPAN) * 100, MIN_WIDTH);

  if (entry.offsetLeft) {
    left = Math.max(0, left + entry.offsetLeft);
  }

  return { left, width };
}

function overlaps(a: TimelineEntry, b: TimelineEntry) {
  const aEnd = effectiveEndYear(a);
  const bEnd = effectiveEndYear(b);
  return a.startYear <= bEnd && b.startYear <= aEnd;
}

function assignRows(entries: TimelineEntry[]) {
  const rows: TimelineEntry[][] = [];

  for (const entry of entries) {
    let placed = false;
    for (const row of rows) {
      if (!row.some((existing) => overlaps(existing, entry))) {
        row.push(entry);
        placed = true;
        break;
      }
    }
    if (!placed) {
      rows.push([entry]);
    }
  }

  return rows;
}

function assignWorkRows(entries: TimelineEntry[]) {
  const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));

  return [
    { entry: byId.dehora, rowIndex: 0 },
    { entry: byId.deltares, rowIndex: 0 },
    { entry: byId.kuijpers, rowIndex: 1 },
  ].filter(
    (item): item is { entry: TimelineEntry; rowIndex: number } => Boolean(item.entry),
  );
}

function TimelineEntryItem({
  entry,
  rowIndex,
  anchor,
}: {
  entry: TimelineEntry;
  rowIndex: number;
  anchor: "left" | "right";
}) {
  const { left, width } = entryPosition(entry);
  const barWidth = Math.max(width, MIN_WIDTH);

  return (
    <div
      className="absolute overflow-visible"
      style={{
        left: `${left}%`,
        width: `${barWidth}%`,
        top: rowIndex * ROW_HEIGHT,
      }}
    >
      <p
        className={`whitespace-nowrap text-xs text-text-primary ${
          anchor === "right" ? "text-right" : ""
        }`}
      >
        {entry.title} · {entry.organization}
      </p>
      <div className="mt-0.5 border-b-2 border-accent/50" />
    </div>
  );
}

function TimelineLane({
  label,
  entries,
  layout,
  anchor,
}: {
  label: string;
  entries: TimelineEntry[];
  layout: "packed" | "work";
  anchor: "left" | "right";
}) {
  const laneHeight =
    layout === "work"
      ? Math.max(2 * ROW_HEIGHT, ROW_HEIGHT)
      : Math.max(assignRows(entries).length * ROW_HEIGHT, ROW_HEIGHT);

  return (
    <div className="mt-6">
      <p className="mb-2 text-xs uppercase tracking-wider text-text-muted">{label}</p>
      <div className="relative overflow-visible" style={{ height: laneHeight }}>
        {layout === "work"
          ? assignWorkRows(entries).map(({ entry, rowIndex }) => (
              <TimelineEntryItem
                key={entry.id}
                entry={entry}
                rowIndex={rowIndex}
                anchor={anchor}
              />
            ))
          : assignRows(entries).map((row, rowIndex) =>
              row.map((entry) => (
                <TimelineEntryItem
                  key={entry.id}
                  entry={entry}
                  rowIndex={rowIndex}
                  anchor={anchor}
                />
              )),
            )}
      </div>
    </div>
  );
}

function YearAxis() {
  const years = Array.from({ length: YEAR_SPAN + 1 }, (_, i) => START_YEAR + i);

  return (
    <div className="relative mt-6 border-t border-border pt-2">
      <div className="flex justify-between">
        {years.map((year) => (
          <span key={year} className="text-xs text-text-muted">
            {year === END_YEAR ? "Present" : year}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HorizontalTimeline({ entries }: HorizontalTimelineProps) {
  const education = entries.filter((e) => e.type === "education");
  const work = entries.filter((e) => e.type === "work");

  return (
    <div className="w-full overflow-visible pb-2">
      <TimelineLane label="Education" entries={education} layout="packed" anchor="left" />
      <YearAxis />
      <TimelineLane label="Work" entries={work} layout="work" anchor="right" />
    </div>
  );
}
