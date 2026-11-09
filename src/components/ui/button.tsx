import type { ButtonHTMLAttributes } from 'react'
import { ArrowUp } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link'
type ButtonSize = 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  showUpArrow?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-slate-300 bg-white text-foreground',
  link: 'bg-transparent text-primary',
}

const sizeClass: Record<ButtonSize, string> = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  showUpArrow = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold disabled:opacity-60 ${variant === 'link' ? 'text-sm' : sizeClass[size]} ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
      {showUpArrow && <ArrowUp className="size-4" aria-hidden="true" />}
    </button>
  )
}
