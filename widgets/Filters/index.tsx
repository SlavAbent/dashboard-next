'use server';

import React from 'react';
import FiltersCreate from '@/widgets/Filters/FiltersCreate';
import { getFilters } from '@/widgets/Filters/_api';

const Filters = async () => {
  const filtersData = await getFilters();

  return <FiltersCreate data={filtersData} />;
};

export default Filters;
