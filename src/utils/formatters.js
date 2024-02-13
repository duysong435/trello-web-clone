
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
// Cách fix bug logic thư viện DnD-kit khi column là rỗng:
// Phía FE sẽ tự tạo ra một cái card đặc biệt: Placeholder Card, không liên quan đến Back-end
// Card đặc biệt này sẽ được  ẩn  ở giao diện UI người dùng
// Cấu trúc Id của cái Id card này để Unique rất đơn giản, không cần phải lmaf random phức tạp:
// "columnId-placeholder-card" (mỗi column chỉ có thể tối đa một cái Placeholder Card)
// Quan trọng khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_placeholdder)
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholaderCard: true
  }
}