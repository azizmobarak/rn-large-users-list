export const generateKeyExtrator = (anyString: string) => {
  const num1 = Math.random() * 200;
  const num2 = Math.random() * 999;
  const num3 = Math.random() * 444;
  const num = num1 + num2 + num3;
  const value = anyString.split('').reverse();
  const newValue = value.join('');
  return anyString + num + value[anyString.length - 2] + newValue;
};
