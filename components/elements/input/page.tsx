interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, placeholder, ...rest }: InputProps) {
  return (
    <div>
      <input type={type} placeholder={placeholder} {...rest} />
    </div>
  );
}
