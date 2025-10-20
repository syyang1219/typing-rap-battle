interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "px-6 py-3 rounded-lg font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-yellow-400 text-black",
    secondary: "bg-purple-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
