import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export function AuditSearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="search-box">
      <Search size={16} />

      <input
        placeholder="Search logs..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}