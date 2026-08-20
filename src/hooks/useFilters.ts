import { useState } from 'react';

export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  return { filters, setFilters };
}
