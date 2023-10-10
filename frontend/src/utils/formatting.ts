// numWord(1, ['штука', 'штуки', 'штук']) -> 'штука'
// numWord(3, ['пара', 'пары', 'пар']) -> 'пары'
// numWord(15, ['рубль', 'рубля', 'рублей']) -> 'рублей'
export function numWord(value: number, words: string[]): string {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

// formateDate('2023-05-13') -> '13 мая'
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(date);
}
