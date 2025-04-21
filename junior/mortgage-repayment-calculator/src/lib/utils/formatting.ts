export function formatNumber(num: string | Event | undefined) {
  if (!num) {
    return '';
  }

  if (num instanceof Event) {
    num = (num.target as HTMLInputElement).value;
  }
  if (typeof num === 'string') {
    return num = num.replace(/[^0-9.-]/g, '');
  }
}


export function formatCurrency(num: Event | string | undefined) {
  let numericValue: string = "";
  formatNumber(num)
  
  if (formatNumber(num) === "" || isNaN(Number(formatNumber(num)))) {
    return;
  }

  numericValue = Intl.NumberFormat('en-GB').format(Number(formatNumber(num)));

  if (num instanceof Event) {
    const target = num.target as HTMLInputElement;
    target.value = numericValue;
  }

  return numericValue
}