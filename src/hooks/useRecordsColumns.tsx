import { ColumnDef } from '@tanstack/react-table';
import { Record } from '../types/record';

export function useRecordsColumns() {
  const columns: ColumnDef<Record>[] = [
    {
      accessorKey: 'date',
      header: 'التاريخ'
    },
    {
      accessorKey: 'time',
      header: 'الوقت'
    },
    {
      accessorKey: 'studentName',
      header: 'اسم الطالب',
      cell: ({ row }) => (
        <span className="text-blue-600 font-medium">
          {row.original.studentName}
        </span>
      )
    },
    {
      accessorKey: 'pages',
      header: 'النقاط'
    },
    {
      accessorKey: 'reason',
      header: 'السبب'
    },
    {
      accessorKey: 'teacher',
      header: 'المعلم'
    },
    {
      accessorKey: 'totalPoints',
      header: 'مجموع النقاط',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {row.original.totalPoints}
        </span>
      )
    },
    {
      accessorKey: 'badge',
      header: 'الشارة',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.original.badge}
        </span>
      )
    }
  ];

  return columns;
}