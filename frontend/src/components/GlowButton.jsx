import { motion } from 'framer-motion';

const VARIANTS = {
  primary: {
    background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(0,212,255,0.4), 0 0 0 1px rgba(0,212,255,0.2)',
    hoverShadow: '0 8px 32px rgba(0,212,255,0.6), 0 0 0 1px rgba(0,212,255,0.4)',
  },
  secondary: {
    background: 'rgba(0,212,255,0.08)',
    color: '#00d4ff',
    border: '1px solid rgba(0,212,255,0.25)',
    boxShadow: 'none',
    hoverShadow: '0 0 20px rgba(0,212,255,0.2)',
  },
  emerald: {
    background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
    hoverShadow: '0 8px 32px rgba(16,185,129,0.6)',
  },
  danger: {
    background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(239,68,68,0.4)',
    hoverShadow: '0 8px 32px rgba(239,68,68,0.6)',
  },
  ghost: {
    background: 'transparent',
    color: '#94a3b8',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'none',
    hoverShadow: '0 0 10px rgba(255,255,255,0.05)',
  },
};

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.03, boxShadow: v.hoverShadow }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 cursor-pointer select-none outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        background: v.background,
        color: v.color,
        border: v.border || 'none',
        boxShadow: v.boxShadow,
        fontFamily: 'Outfit, Inter, system-ui, sans-serif',
        letterSpacing: '0.02em',
      }}
    >
      {/* Shine overlay */}
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
        />
      </span>

      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Loading...
        </span>
      ) : (
        <span className="flex items-center gap-2 relative z-10">
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </span>
      )}
    </motion.button>
  );
}
