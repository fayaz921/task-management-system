import { create } from 'zustand'

export const useTaskStore = create((set, get) => ({
  tasks: [],
  totalCount: 0,
  page: 1,
  pageSize: 6,
  filters: {
    search: '',
    status: '',
    priority: '',
  },

  setTasks: (tasks, totalCount) => set({ tasks, totalCount }),

  setPage: (page) => set((state) => ({ page: typeof page === 'function' ? page(state.page) : page })),

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters }, page: 1 }),

  resetFilters: () => set({ filters: { search: '', status: '', priority: '' }, page: 1 }),
}))
