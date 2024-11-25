import { Button } from "./CustomButton.style";

interface CustomButtonProps {
  title: string;
  onClick?: () => void;
}

export default function CustomButton({ title, onClick }: CustomButtonProps) {
  return <Button onClick={onClick}>{title}</Button>;
}
