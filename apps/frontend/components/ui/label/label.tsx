interface LabelProps extends React.ComponentProps<"label"> {}

export const Label = (props: LabelProps) => {
  return <label {...props} />;
};
