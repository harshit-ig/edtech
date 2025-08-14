import { useState, useEffect } from "react";

interface RoleCarouselProps {
  rolesList: string[];
  interval?: number;
}

interface CardData {
  role: string;
  position: number; // 0=top4, 1=top3, 2=top2, 3=top1, 4=center, 5=bottom1, 6=bottom2, 7=bottom3, 8=bottom4
  previousPosition: number;
  id: number;
}

const RoleCarousel = ({ rolesList, interval = 2000 }: RoleCarouselProps) => {
  const [cards, setCards] = useState<CardData[]>(() => [
    { role: rolesList[5] || rolesList[0], position: 0, previousPosition: 0, id: 0 }, // top4
    { role: rolesList[6] || rolesList[0], position: 1, previousPosition: 1, id: 1 }, // top3
    { role: rolesList[7] || rolesList[0], position: 2, previousPosition: 2, id: 2 }, // top2
    { role: rolesList[8] || rolesList[0], position: 3, previousPosition: 3, id: 3 }, // top1
    { role: rolesList[0] || rolesList[0], position: 4, previousPosition: 4, id: 4 }, // center
    { role: rolesList[1] || rolesList[0], position: 5, previousPosition: 5, id: 5 }, // bottom1
    { role: rolesList[2] || rolesList[0], position: 6, previousPosition: 6, id: 6 }, // bottom2
    { role: rolesList[3] || rolesList[0], position: 7, previousPosition: 7, id: 7 }, // bottom3
    { role: rolesList[4] || rolesList[0], position: 8, previousPosition: 8, id: 8 }, // bottom4
  ]);
  const [nextRoleIndex, setNextRoleIndex] = useState(9);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);

      // Update positions immediately for animation logic
      setCards(prevCards => {
        const newCards = prevCards.map(card => ({
          ...card,
          previousPosition: card.position,
          position: card.position - 1
        }));
        
        // Remove card that went off top (position -1)
        const visibleCards = newCards.filter(card => card.position >= 0);
        
        // Add new card at bottom (position 8)
        const newRole = rolesList[nextRoleIndex % rolesList.length];
        visibleCards.push({ 
          role: newRole, 
          position: 8, 
          previousPosition: 8,
          id: Date.now() 
        });
        
        return visibleCards;
      });
      
      setNextRoleIndex(prev => prev + 1);

      setTimeout(() => {
        setAnimating(false);
      }, 1200); // slightly longer for more natural feel
    }, interval);

    return () => clearInterval(id);
  }, [interval, rolesList, nextRoleIndex]);

  const getCardStyles = (position: number, animating: boolean) => {
    const positions = {
      0: { y: -40, scale: 0.7, opacity: 0.1, zIndex: 1, rotateX: 120 },   // top4 - very low visibility
      1: { y: -32, scale: 0.75, opacity: 0.3, zIndex: 2, rotateX: 120 },  // top3
      2: { y: -24, scale: 0.8, opacity: 0.5, zIndex: 3, rotateX: 120 },   // top2
      3: { y: -16, scale: 0.9, opacity: 0.7, zIndex: 4, rotateX: 120 },   // top1
      4: { y: 0, scale: 1.0, opacity: 1.0, zIndex: 10, rotateX: 0 },      // center
      5: { y: 16, scale: 0.9, opacity: 0.7, zIndex: 4, rotateX: -120 },   // bottom1
      6: { y: 24, scale: 0.8, opacity: 0.5, zIndex: 3, rotateX: -120 },   // bottom2
      7: { y: 32, scale: 0.75, opacity: 0.3, zIndex: 2, rotateX: -120 },  // bottom3
      8: { y: 40, scale: 0.7, opacity: 0.1, zIndex: 1, rotateX: -120 },   // bottom4 - very low visibility
    };

    const pos = positions[position as keyof typeof positions];
    
    return {
      transform: `perspective(400px) translateY(${pos.y * 4}px) scale(${pos.scale}) rotateX(${pos.rotateX}deg)`,
      opacity: pos.opacity,
      zIndex: pos.zIndex,
      transition: animating ? 'all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'none',
      transformStyle: 'preserve-3d' as const
    };
  };

  const getFlipAnimation = (card: CardData) => {
    if (!animating) return 'none';
    
    if (card.previousPosition === 4 && card.position === 3) {
      // Center card moving up - flip from showing text to hiding text
      return 'cardFlipUp 1s ease-in-out forwards';
    }
    
    if (card.previousPosition === 5 && card.position === 4) {
      // Bottom1 card moving to center - flip from hiding text to showing text
      return 'cardFlipToCenter 1s ease-in-out forwards';
    }
    
    return 'none';
  };

  return (
    <div className="relative w-80 h-[400px] flex flex-col justify-center items-center perspective-1000 overflow-hidden">
      {cards.map((card) => (
        <div
          key={card.id}
          className="absolute w-72 h-16 shadow-lg"
          style={getCardStyles(card.position, animating)}
        >
          {/* All cards use same 3D structure for consistency */}
          <div className="w-full h-full rounded-lg card-3d preserve-3d" 
               style={{
                 animation: getFlipAnimation(card),
                 // Apply permanent rotation for center card when not animating
                 transform: (!animating && card.position === 4) ? 'rotateX(0deg)' : 'rotateX(-180deg)'
               }}>
            {/* Back side (with text) - rotateX(0deg) */}
            <div className="card-back absolute inset-0 rounded-lg backface-hidden flex items-center justify-center"
                 style={{
                   background: 'linear-gradient(to right, rgb(20 184 166), rgb(5 150 105))'
                 }}>
              <span className="text-white font-bold text-lg">
                {card.position === 4 ? card.role : ''}
              </span>
            </div>
            
            {/* Front side (empty) - rotateX(180deg) */}
            <div className="card-front absolute inset-0 rounded-lg backface-hidden"
                 style={{
                   transform: 'rotateX(180deg)',
                   background: 'linear-gradient(to right, rgb(20 184 166), rgb(5 150 105))'
                 }}>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleCarousel;
