import { SearchCriteria } from '@/components/pages/drawing-search/types';

export const initialSearchCriteria: SearchCriteria = {
    size: {
      width: { min: null, max: null },
      height: { min: null, max: null }
    },
    gl: { min: null, max: null },
    pillars: { min: null, max: null }
  };
