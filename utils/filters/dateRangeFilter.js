const dateRangeFilter = (row, columnId, value) => {
  const [start, end] = value || [];
  const cellValue = row.getValue(columnId);
  const date = new Date(cellValue);

  if (start && date < new Date(start)) return false;
  if (end && date > new Date(end)) return false;

  return true;
};

export default dateRangeFilter;
