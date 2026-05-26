import { useEffect } from 'react'
import { useTaskStore } from '../store/taskStore'
import api from '../../../lib/axios'

export default function useGetTasks() {
  const { tasks, totalCount, page, pageSize, filters, setTasks } = useTaskStore()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {
          search: filters.search || undefined,
          status: filters.status !== '' ? Number(filters.status) : undefined,
          priority: filters.priority !== '' ? Number(filters.priority) : undefined,
          page,
          pageSize,
        }
        const response = await api.get('/Tasks', { params })
        if (response.data.isSuccess) {
          const pagedData = response.data.data
          setTasks(pagedData.items || [], pagedData.totalCount || 0)
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err)
      }
    }
    fetchTasks()
  }, [page, pageSize, filters])

  return { tasks, totalCount, page, pageSize }
}