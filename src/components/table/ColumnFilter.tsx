import React from 'react';
import { Column, Table } from '@tanstack/react-table';

interface ColumnFilterProps<T> {
  column: Column<T, unknown>;
  table: Table<T>;
}

export function ColumnFilter<T>({ column, table }: ColumnFilterProps<T>) {
  // جمع القيم الفريدة من جميع الصفوف
  const uniqueValues = React.useMemo(() => {
    const values = new Set<string>();
    table.getPreFilteredRowModel().flatRows.forEach((row) => {
      const value = row.getValue(column.id);
      if (value) {
        values.add(value.toString());
      }
    });
    return Array.from(values).sort();
  }, [column.id, table]);

  return (
    <select
      value={(column.getFilterValue() ?? '') as string}
      onChange={(e) => {
        column.setFilterValue(e.target.value || undefined);
      }}
      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
    >
      <option value="">الكل</option>
      {uniqueValues.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
