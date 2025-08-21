const Label: React.FC<
  React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>
> = ({ children, ...props }) => {
  return (
    <label
      htmlFor="input"
      className="text-content-secondary text-sm"
      {...props}
    >
      {children}
    </label>
  );
};

export { Label };
