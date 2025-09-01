const FIRST_PART = 1;
const SECOND_PART = 2;

const truncateEthAddress = (
  props: Readonly<{
    address: string;
    numOfChars?: number;
  }>
) => {
  const { address, numOfChars } = props;

  const truncateRegex = new RegExp(
    `^(0x[a-zA-Z0-9]{${numOfChars}})[a-zA-Z0-9]+([a-zA-Z0-9]{${numOfChars}})$`
  );
  const match = address.match(truncateRegex);

  if (!match) {
    return address;
  }

  return `${match[FIRST_PART]}…${match[SECOND_PART]}`;
};

export { truncateEthAddress };
