import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';

const AnimatedCard = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      ref={ref}
    >
      <Card {...props}>
        {children}
      </Card>
    </motion.div>
  );
});

export default AnimatedCard;