
/**
 * TODO: Variants: Primary, Secondary & Outline
 * TODO: Sizes: small, medium and large
 * TODO: stretch: boolean
 * TODO: icon { leadingIcon: ReactNode; position: right or left }
 */

import { cn } from "@/helpers";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  stretch?: boolean;
  leadingIcon?: React.ReactNode;
  iconPosition?: "right" | "left";
}

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "medium",
  stretch = false,
  leadingIcon,
  iconPosition = "left",
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base classes for all the button components
        "flex flex-row items-center justify-center border font-medium",
        // Classes for sizes
        size === "small" && "px-3 py-2 rounded-md gap-1.5 text-sm",
        size === "medium" && "px-6 py-2 rounded-lg gap-2 text-base",
        size === "large" && "px-6 py-3 rounded-xl gap-2.5 text-lg",
        // Classes for variants
        variant === "primary" && "bg-orange-500 hover:bg-orange-600 border-transparent text-white",
        variant === "secondary" && "bg-zinc-800 hover:bg-zinc-900 border-transparent text-white",
        variant === "outline" && "bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800",
        // Classes for additional props
        stretch && "w-full"
      )}
      {...props}
    >
      {iconPosition === "left" && leadingIcon}
      {children}
      {iconPosition === "right" && leadingIcon}
    </button>
  )
}

export {
  Button
}