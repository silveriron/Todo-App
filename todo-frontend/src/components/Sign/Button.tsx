interface ButtonProps {
  disabled: boolean;
  testid: string;
  children: React.ReactNode;
}

const Button = ({ disabled, testid, children }: ButtonProps) => {
  return (
    <button
      className="bg-black text-white rounded h-10 disabled:bg-slate-500 disabled:text-slate-300"
      disabled={disabled}
      data-testid={testid}
    >
      {children}
    </button>
  );
};

export default Button;
