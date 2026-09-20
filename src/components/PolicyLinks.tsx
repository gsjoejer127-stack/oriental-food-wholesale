import React from 'react';

import type { PolicyTab } from './DisclaimerModal';

export const POLICY_LINKS: { id: PolicyTab; label: string }[] = [
  { id: 'returns', label: 'Refund and Return Policy' },
  { id: 'terms', label: 'Terms and Conditions Policy' },
  { id: 'pdpa', label: 'PDPA' },
];

interface PolicyLinksProps {
  onOpen?: (tab: PolicyTab) => void;
  layout?: 'row' | 'list';
  className?: string;
  linkClassName?: string;
}

export const PolicyLinks: React.FC<PolicyLinksProps> = ({
  onOpen,
  layout = 'row',
  className = '',
  linkClassName = '',
}) => {
  if (!onOpen) return null;

  return (
    <ul
      className={`${
        layout === 'list' ? 'space-y-1' : 'flex flex-wrap items-center gap-x-5 gap-y-1'
      } ${className}`}
    >
      {POLICY_LINKS.map((link, index) => (
        <li key={link.id}>
          <button
            type="button"
            onClick={() => onOpen(link.id)}
            className={`underline underline-offset-2 cursor-pointer ${linkClassName}`}
          >
            {index + 1}. {link.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
