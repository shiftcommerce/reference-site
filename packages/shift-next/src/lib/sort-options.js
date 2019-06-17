export const sortOptions = (baseIndex) => {
  return [
    { value: baseIndex, label: 'Featured' },
    { value: `${baseIndex}_price_asc`, label: 'Price asc.' },
    { value: `${baseIndex}_price_desc`, label: 'Price desc.' },
    { value: `${baseIndex}_created_at_desc`, label: 'Newest' },
    { value: `${baseIndex}_total_purchases_desc`, label: 'Most Popular' },
    { value: `${baseIndex}_rating_desc`, label: 'Rating desc.' }
  ]
}
