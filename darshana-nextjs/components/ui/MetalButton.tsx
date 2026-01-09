'use client';

import Link from 'next/link';
import Image from 'next/image';

type MetalButtonVariant = 'primary' | 'outline';
type MetalButtonSize = 'small' | 'default' | 'large' | 'xlarge';

interface MetalButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: MetalButtonVariant;
  size?: MetalButtonSize;
  disabled?: boolean;
  className?: string;
}

export default function MetalButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'default',
  disabled = false,
  className = '',
}: MetalButtonProps) {
  const sizeClasses = {
    small: 'metal-button-small',
    default: '',
    large: 'metal-button-large',
    xlarge: 'metal-button-xlarge',
  };

  const variantClass = variant === 'outline' ? 'metal-button-outline' : '';
  const buttonClasses = `metal-button ${sizeClasses[size]} ${variantClass} ${className}`.trim();

  // Primary variant uses the metal background image
  const primaryContent = (
    <>
      <Image
        src="/images/metal-bg.png"
        alt=""
        width={350}
        height={60}
        className="metal-button-bg"
        priority
      />
      <span className="metal-button-text">{children}</span>
    </>
  );

  // Outline variant is a bordered button without the image
  const outlineContent = (
    <span className="metal-button-text">{children}</span>
  );

  const content = variant === 'outline' ? outlineContent : primaryContent;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
