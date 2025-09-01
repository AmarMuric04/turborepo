const formatInputNumber = (value: string) => {
  const sanitizedValue = value.replace(/[^0-9,.]/g, "");

  const formattedValue = sanitizedValue.replace(/,/g, ".");

  let wasDotFound = false;

  const resultValue = formattedValue.replace(/\./g, (match) => {
    if (!wasDotFound) {
      wasDotFound = true;
      return match;
    } else {
      return "";
    }
  });

  return resultValue;
};

export { formatInputNumber };
