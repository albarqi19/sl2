import { ColumnDef, sortingFns } from '@tanstack/react-table';
import { Student } from '../types/student';
import { StudentActions } from '../components/students/StudentActions';
import { useMemo } from 'react';
import { ColumnFilter } from '../components/table/ColumnFilter';

interface UseStudentsColumnsProps {
  onStudentSelect: (student: Student) => void;
  onStudentEdit: (student: Student) => Promise<boolean>;
}

export function useStudentsColumns({ onStudentSelect, onStudentEdit }: UseStudentsColumnsProps) {
  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'رقم الهوية',
        sortingFn: sortingFns.alphanumeric
      },
      {
        accessorKey: 'studentName',
        header: 'اسم الطالب',
        cell: ({ row }) => (
          <button
            onClick={() => onStudentSelect(row.original)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {row.original.studentName}
          </button>
        ),
        sortingFn: sortingFns.alphanumeric
      },
      {
        accessorKey: 'level',
        header: 'الحلقة',
        enableColumnFilter: true,
        sortingFn: sortingFns.alphanumeric,
        filterFn: 'includesString',
        meta: {
          filterComponent: ColumnFilter
        }
      },
      {
        accessorKey: 'classNumber',
        header: 'رقم الحلقة',
        sortingFn: sortingFns.alphanumeric
      },
      {
        accessorKey: 'parts',
        header: 'المستوى الحالي',
        enableColumnFilter: true,
        sortingFn: sortingFns.alphanumeric,
        filterFn: 'includesString',
        meta: {
          filterComponent: ColumnFilter
        }
      },
      {
        accessorKey: 'points',
        header: 'النقاط',
        sortingFn: sortingFns.alphanumeric,
        cell: ({ row }) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {row.original.points}
          </span>
        )
      },
      {
        accessorKey: 'violations',
        header: 'المخالفات',
        sortingFn: sortingFns.alphanumeric
      },
      {
        accessorKey: 'phone',
        header: 'الجوال',
        sortingFn: sortingFns.alphanumeric
      },
      {
        id: 'actions',
        header: 'الإجراءات',
        enableSorting: false,
        cell: ({ row }) => (
          <StudentActions
            row={row}
            onEdit={onStudentEdit}
          />
        )
      }
    ],
    [onStudentSelect, onStudentEdit]
  );

  return columns;
}