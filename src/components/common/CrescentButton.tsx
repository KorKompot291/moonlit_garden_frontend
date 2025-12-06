import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

const CrescentButton: React.FC<Props> = ({ label, badge, icon, ...rest }) => {
  return (
    <button className="crescent-button" {...rest}>
      {icon && <span style={{ position: 'relative' }}>{icon}</span>}
      <span className="crescent-button-label">{label}</span>
      {badge && <span className="crescent-button-badge">{badge}</span>}
    </button>
  );
};

export default CrescentButton;
