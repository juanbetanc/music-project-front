
"use client"

import { InputHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon: LeftIcon, className, ...props }, ref) => {
    return (
      <div className="relative">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}
        <input
          {...props}
          ref={ref}
          className={`pl-9 ${className}`}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
