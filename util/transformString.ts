export function safeStringToInteger(input: any) {
  const convertedInput = parseInt(input);
  if (isNaN(convertedInput)) {
    return 0;
  } else {
    return convertedInput;
  }
}

export function safeStringToFloat(input: any) {
  const convertedInput = parseFloat(input);
  if (isNaN(convertedInput)) {
    return 0;
  } else {
    return convertedInput;
  }
}
