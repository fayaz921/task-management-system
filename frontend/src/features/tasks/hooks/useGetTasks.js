import { useEffect, useState } from 'react'
import { useTaskStore } from '../store/taskStore'
import api from '../../../lib/axios'

export default function useGetTasks() {
  const { tasks, totalCount, page, pageSize, filters, setTasks } = useTaskStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchTasks = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {
          search: filters.search || undefined,
          status: filters.status !== '' ? filters.status : undefined,
          priority: filters.priority !== '' ? filters.priority : undefined,
          page,
          pageSize,
        }
        const response = await api.get('/Tasks', { params })
        if (!ignore && response.data.isSuccess) {
          const pagedData = response.data.data
          setTasks(pagedData.items || [], pagedData.totalCount || 0)
        } else if (!ignore) {
          setError(response.data.message || 'Failed to fetch tasks')
        }
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || err.message || 'Failed to fetch tasks')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchTasks()

    return () => {
      ignore = true
    }
  }, [page, pageSize, filters, setTasks])

  return { tasks, totalCount, page, pageSize, loading, error }
}
