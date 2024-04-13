export const ITEMS_PER_PAGE = 12;

export const ORDERS_PER_PAGE = 10;

export function discountedPrice(price, discountPercentage) {
    return Math.round(price * ((100 - discountPercentage) / 100))
}
