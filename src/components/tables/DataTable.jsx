import { ChevronUp, ChevronDown, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function DataTable({
  columns,
  data,
  loading = false,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
}) {
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item[column.key], item)
    }
    return item[column.key]
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-secondary rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (data?.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No data found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-secondary border-b border-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-background transition-colors"
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable !== false && sortField === column.key && (
                    <span>
                      {sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {(onEdit || onDelete) && <th className="text-left py-3 px-4 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id || index} className="border-b border-border hover:bg-secondary transition-colors">
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`} className="py-3 px-4">
                  {renderCell(item, column)}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && pagination.total > pagination.limit && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50 text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page * pagination.limit >= pagination.total}
              className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
