import React from 'react';
import { GradientBorder } from './GradientBorder';

interface CardProps {
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <GradientBorder className="w-[300px] h-[400px] rounded-[15px]">
      <div className="relative w-full h-full bg-black text-white p-5 box-border rounded-[14px]">
        <h2 className="text-2xl uppercase mb-5">{title}</h2>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
    </GradientBorder>
  );
};