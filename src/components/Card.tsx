import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`card ${onClick ? 'cursor-pointer hover:border-accent/50 transition-colors duration-200' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function StatCard({ title, value, description, icon, onClick }: StatCardProps) {
  return (
    <Card onClick={onClick} className={onClick ? 'hover:border-accent/50' : ''}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {description && <p className="text-text-secondary text-sm mt-1">{description}</p>}
        </div>
        {icon && <div className="text-accent text-2xl">{icon}</div>}
      </div>
    </Card>
  );
}
