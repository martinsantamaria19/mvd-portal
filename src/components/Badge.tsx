type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  success: 'bg-green-900/40 text-green-400 border border-green-800',
  warning: 'bg-yellow-900/40 text-yellow-400 border border-yellow-800',
  danger: 'bg-red-900/40 text-red-400 border border-red-800',
  info: 'bg-blue-900/40 text-blue-400 border border-blue-800',
  default: 'bg-panel text-text-secondary border border-border',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
