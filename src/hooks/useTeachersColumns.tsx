import { ColumnDef } from '@tanstack/react-table';
import { Teacher } from '../types/student';
import { TeacherActions } from '../components/teachers/TeacherActions';

export function useTeachersColumns() {
  const columns: ColumnDef<Teacher>[] = [
    {
      accessorKey: 'name',
      header: 'اسم المعلم',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">
          {row.original.name}
        </span>
      )
    },
    {
      accessorKey: 'username',
      header: 'المستخدم',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {row.original.username}
        </span>
      )
    },
    {
      accessorKey: 'limit',
      header: 'الحد',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {row.original.limit}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'الإجراءات',
      cell: TeacherActions
    }
  ];

  return columns;
}