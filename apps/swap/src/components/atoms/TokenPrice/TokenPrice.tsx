const TokenPrice: React.FC<{
  tokenAddress: string;
}> = ({ tokenAddress }) => {
  return <p>0.00 {tokenAddress}</p>;
};

export { TokenPrice };
