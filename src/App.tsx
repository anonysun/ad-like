import React from 'react';
import { Card } from './components/Card';

const App: React.FC = () => {
  const cards = [
    {
      title: "The clear developer's choice",
      description: "During evaluation periods, an average of 83% of developers choose Cursor over all competitors as their top AI coding tool choice."
    },
    {
      title: "Ready for enterprise scale",
      description: "Battle-tested to handle large codebases with tens of millions of lines of code and support development teams of any size."
    },
    {
      title: "Committed to security",
      description: "SOC2 Type II certified, enforced privacy mode, and zero data retention to make sure your proprietary code stays safe."
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a] font-sans overflow-hidden">
      <div className="flex gap-5">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
};

export default App;
