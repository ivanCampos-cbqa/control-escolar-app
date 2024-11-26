import { Button } from "./CustomButton.style";

interface CustomButtonProps {
  title: string;
  onClick?: () => void;
  style?: React.CSSProperties
}

export default function CustomButton({ title, onClick, style }: CustomButtonProps) {
  return <Button onClick={onClick} style={style}>{title}</Button>;
}
