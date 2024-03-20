import { ReactNode } from "react";

// Portfolio Items Data Types
export type PortfolioItemType = {
  title: ReactNode;
  image: any;
  order: number;
  category: string;
  action: {
    type: string;
    number: number;
  };
  description: {
    text: string;
    caption: string;
  };
};
