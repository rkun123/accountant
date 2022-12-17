export function formatPrice(price: number): string {
  let priceStr = Math.round(price).toString();
  return priceStr.split("").reduceRight((pre, cur, idx, all) => {
    const reverseIdx = all.length - idx - 1;
    if (
      cur !== "-" && // 現在が-ではない
      (reverseIdx + 1) % 3 === 0 && // 現在が3の倍数
      idx !== 0 && // 現在が最大桁ではない
      all.at(idx - 1) !== "-" // 次の桁が-ではない
    ) {
      return `,${cur}${pre}`;
    }
    return `${cur}${pre}`;
  });
}
