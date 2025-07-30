import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
  return (
    <div className="bg-card hover:bg-accent rounded-md p-4 flex justify-between items-center  md:lg-0 border">
      <div>
        <h2 className="text-sm ">{title}</h2>
        <p className="text-md font-semibold">{value}</p>
      </div>
      <div className="mt-1">{icon}</div>
    </div>
  );
};

export default SummaryCard;
