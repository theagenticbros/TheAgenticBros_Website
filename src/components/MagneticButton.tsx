"use client";

import { useRef, useState, ButtonHTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart" | "style"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles =
    "relative font-heading font-semibold tracking-wide rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer";

  const variants = {
    primary:
      "bg-cyber-cyan text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-95",
    secondary:
      "bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] active:scale-95",
    outline:
      "bg-transparent border border-gray-700 text-white hover:border-cyber-cyan hover:text-cyber-cyan active:scale-95",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      type={type}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
