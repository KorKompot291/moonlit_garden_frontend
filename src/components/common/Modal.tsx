import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(18px)',
        background: 'rgba(5, 7, 20, 0.75)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: 420,
          width: '90%',
          maxHeight: '80vh',
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title && <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>}
          <button
            onClick={onClose}
            style={{
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.7)',
              background: 'rgba(15,23,42,0.9)',
              color: '#e5e7eb',
              width: 28,
              height: 28,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ overflowY: 'auto', paddingRight: 4 }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
