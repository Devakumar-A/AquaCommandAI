import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  rightIcon,
  error,
  hint,
  required,
  name,
  id,
  autoComplete,
  min,
  max,
  step,
  className = '',
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== '' && value !== undefined && value !== null;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
          style={{ color: focused ? '#00d4ff' : '#64748b' }}
        >
          {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
            style={{ color: focused ? '#00d4ff' : '#475569', transition: 'color 0.2s' }}
          >
            {icon}
          </div>
        )}
        <motion.input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          min={min}
          max={max}
          step={step}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full outline-none transition-all font-[Outfit,sans-serif]"
          style={{
            background: focused
              ? 'rgba(0,212,255,0.06)'
              : 'rgba(0,212,255,0.03)',
            border: `1px solid ${
              error
                ? '#ef4444'
                : focused
                ? '#00d4ff'
                : 'rgba(0,212,255,0.15)'
            }`,
            borderRadius: '0.75rem',
            color: '#f0f4ff',
            padding: icon ? '0.875rem 1rem 0.875rem 2.75rem' : '0.875rem 1rem',
            paddingRight: rightIcon ? '3rem' : '1rem',
            fontSize: '0.9rem',
            boxShadow: focused
              ? `0 0 0 3px ${error ? 'rgba(239,68,68,0.1)' : 'rgba(0,212,255,0.1)'}, 0 0 16px ${error ? 'rgba(239,68,68,0.1)' : 'rgba(0,212,255,0.12)'}`
              : 'none',
            transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">
            {rightIcon}
          </div>
        )}
        {focused && !error && (
          <motion.div
            layoutId={`input-glow-${name}`}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: '0 0 0 1px rgba(0,212,255,0.3)', borderRadius: '0.75rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs mt-1.5 flex items-center gap-1"
          style={{ color: '#ef4444' }}
        >
          ⚠ {error}
        </motion.p>
      )}
      {hint && !error && (
        <p className="text-xs mt-1.5" style={{ color: '#475569' }}>{hint}</p>
      )}
    </div>
  );
}
