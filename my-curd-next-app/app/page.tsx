import Card from "./components/Card";
import Slider from "./components/Slider";

export default function Home() {

  // Logic: Same array of objects structure
  const cardViewData = [
    {
      title: "Explore 500+ Genres",
      description: "Access collections from Fiction, Sci-Fi, History, Philosophy, and more."
    },
    {
      title: "Preview Digital Books",
      description: "Read the first few chapters online before borrowing the physical copy."
    },
    {
      title: "Connect with Librarians",
      description: "Get expert recommendations and help finding rare manuscripts."
    },
    {
      title: "Global e-Library Access",
      description: "Borrow e-books and audiobooks from anywhere in the world, 24/7."
    }
  ];

  return (
    <>
      {/* Hero Slider */}
      <Slider />

      {/* Logic: Same map function to render cards */}
      <div className="m-5 flex flex-wrap gap-6 justify-center">
        {cardViewData.map((cardData, index) => {
          return (
            <Card 
              key={index} 
              title={cardData.title} 
              description={cardData.description} 
            />
          );
        })}
      </div>
    </>
  );
}