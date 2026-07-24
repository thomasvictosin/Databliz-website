'use client';

const CALENDLY_URL = 'https://calendly.com/bolajiaustine1703/30min';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget?: (options: { url: string }) => void;
    };
  }
}

type BookConsultationButtonProps = {
  className?: string;
  children?: React.ReactNode;
  variant?: 'light' | 'dark';
  fullWidth?: boolean;
};

export default function BookConsultationButton({
  className = '',
  children = 'Book Free Consultation',
  variant = 'light',
  fullWidth = false,
}: BookConsultationButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }

    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  const baseClasses = [
    'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5',
    fullWidth ? 'w-full' : 'w-fit',
  ];

  const variantClasses = {
    light: 'bg-white text-[#0a1560] hover:bg-blue-200',
    dark: 'bg-[#3E4095] text-white hover:bg-[#3176B1]',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses.join(' ')} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
