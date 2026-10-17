import React from 'react';
import { ContactFinale } from '../components/ContactFinale';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="w-full min-h-screen pt-20 bg-[#111116] text-[#F0F1FA]">
      <ContactFinale onNavigate={onNavigateHome} />
    </div>
  );
};
