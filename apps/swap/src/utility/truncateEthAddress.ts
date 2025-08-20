const truncateEthAddress = ({
  address,
  numOfChars = 4,
}: {
  address: string;
  numOfChars?: number;
}): string => {
  const truncateRegex = new RegExp(
    `^(0x[a-zA-Z0-9]{${numOfChars}})[a-zA-Z0-9]+([a-zA-Z0-9]{${numOfChars}})$`
  );
  const match = address.match(truncateRegex);

  if (!match) {
    return address;
  }

  return `${match[1]}…${match[2]}`;
};

export { truncateEthAddress };
