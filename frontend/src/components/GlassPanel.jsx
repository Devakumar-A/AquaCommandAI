import { motion } from 'framer-motion';

export default function GlassPanel({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'p-6',
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card ${padding} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      style={glow ? {
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(0,212,255,0.15)',
        borderColor: 'rgba(0,212,255,0.3)',
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
