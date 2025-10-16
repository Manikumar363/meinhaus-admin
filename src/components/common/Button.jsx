const Button = ({ Icon, iconSize = 16, title, className, ...props }) => {
  return (
    <button
      className={`flex items-center gap-1 rounded-lg px-2 py-1 transition-color ${className}`}
      {...props}
    >
      {Icon && <Icon size={iconSize} />}
      <span>{title}</span>
    </button>
  );
};

export default Button;
