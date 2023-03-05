type ThemeProps = {
  children: React.ReactNode;
  id: number;
  handleTheme: Function;
};

export const Theme = ({ children, id, handleTheme }: ThemeProps) => {
  return <li onClick={(e) => handleTheme(id)}>{children}</li>;
};
