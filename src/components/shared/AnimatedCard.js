import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';

// Cria um Card animado usando motion do Framer Motion
const MotionCard = motion(Card);

/**
 * AnimatedCard
 * Componente de cartão animado para uso em grids responsivos.
 * - Anima entrada, saída, hover e tap.
 * - Use junto com <AnimatePresence> para animações de desmontagem.
 * - Evita aninhamento desnecessário de divs.
 * - Aceita todas as props do Card do Material UI.
 */
const AnimatedCard = React.memo(({ children, transition, ...props }) => {
  return (
    <MotionCard
      // Animação de entrada: começa invisível e deslocado para baixo
      initial={{ opacity: 0, y: 20 }}
      // Animação ao aparecer: visível e na posição normal
      animate={{ opacity: 1, y: 0 }}
      // Animação de saída: volta a ficar invisível e deslocado para baixo
      exit={{ opacity: 0, y: 20 }}
      // Duração da animação (pode ser customizada via prop)
      transition={transition || { duration: 0.3 }}
      // Efeito de leve zoom ao passar o mouse
      whileHover={{ scale: 1.02 }}
      // Animação de clique/tap
      whileTap={{ scale: 0.98 }}
      // Permite passar outras props do Card normalmente
      {...props}
    >
      {children}
    </MotionCard>
  );
});

export default AnimatedCard;