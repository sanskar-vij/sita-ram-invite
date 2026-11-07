import React from 'react';

interface CardHeaderProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  activeItem?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = () => {
  return null;
};
