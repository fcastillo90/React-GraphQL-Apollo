module.exports =  {
  sorting: ({field, sort, a, b}) => {
    if (a[field] > b[field]) return sort === 'asc' ? 1 : -1
    if (a[field] < b[field]) return sort === 'asc' ? -1 : 1
    return 0
  }
}