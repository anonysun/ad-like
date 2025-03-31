import React from 'react';
import { Card } from './components/Card';

const App: React.FC = () => {
  const cards = [
    {
      title: "THE CLEAR DEVELOPER'S CHOICE",
      description: "During evaluation periods, an average of 83% of developers choose Cursor over all competitors as their top AI coding tool choice."
    },
    {
      title: "READY FOR ENTERPRISE SCALE",
      description: "Battle-tested to handle large codebases with tens of millions of lines of code and support development teams of any size."
    },
    {
      title: "COMMITTED TO SECURITY",
      description: "SOC2 Type II certified, enforced privacy mode, and zero data retention to make sure your proprietary code stays safe."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a] flex flex-col items-center pt-[100px] px-4">
      <div className="flex flex-col md:flex-row gap-5 max-w-[1200px] w-full justify-center items-center">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
};

export default App;