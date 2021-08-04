// 상품 구매 목록을 표시하는 경우 필요한 포매팅 함수
// ex 사이다 1개

// innerHTML
export const createPurchasedResultContent = (productName, quantity) =>
  `${productName} ${quantity}개`;
