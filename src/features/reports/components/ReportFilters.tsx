interface ReportFiltersProps {
  startDate: string;
  endDate: string;
  loading: boolean;

  onStartDateChange: (
    value: string
  ) => void;

  onEndDateChange: (
    value: string
  ) => void;

  onGenerate: () => Promise<void>;
}

export function ReportFilters({
  startDate,
  endDate,
  loading,
  onStartDateChange,
  onEndDateChange,
  onGenerate,
}: ReportFiltersProps) {
  return (
    <section className="panel report-filter">
      <label>
        Start Date

        <input
          type="date"
          value={startDate}
          onChange={(event) =>
            onStartDateChange(
              event.target.value
            )
          }
        />
      </label>

      <label>
        End Date

        <input
          type="date"
          value={endDate}
          onChange={(event) =>
            onEndDateChange(
              event.target.value
            )
          }
        />
      </label>

      <button
        type="button"
        className="primary-button"
        onClick={onGenerate}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Report"}
      </button>
    </section>
  );
}