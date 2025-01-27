import { FormData } from '@/components/pages/drawing-register/types';
import { getColumns } from './columns';

interface TableHeaderProps {
  results: FormData[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({ results }) => {
  const columns = getColumns(results);

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            className={`border px-4 py-2 text-left w-[${column.width}px]`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}; 