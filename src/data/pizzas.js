/**
 * Dados das pizzas da Amandinha Pizzaria Cajazeiras
 * 
 * Este arquivo contém o catálogo completo de pizzas disponíveis no cardápio.
 * Cada pizza possui:
 * - id: Identificador único
 * - name: Nome da pizza
 * - description: Descrição dos ingredientes
 * - price: Preço base (tamanho M)
 * - category: Categoria (Tradicional, Especial, Doce, etc.)
 * 
 * Observações:
 * - Os preços variam conforme o tamanho (P = 80% do valor de M, G = 120% do valor de M)
 * - As categorias são usadas para filtragem no cardápio
 */

// Array com todas as pizzas disponíveis
export const pizzas = [
  // ===== PIZZAS TRADICIONAIS =====
  {
    id: 1,
    name: 'A Moda da Casa',
    description: 'Molho de tomate, mussarela, presunto, calabresa e cebola',
    price: 30.00,
    category: 'Tradicional'
  },
  {
    id: 2,
    name: 'Bacon',
    description: 'Molho de tomate, mussarela, bacon, calabresa, cebola, oregano e pimenta',
    price: 23.00,
    category: 'Tradicional'
  },
  {
    id: 3,
    name: 'Frango com Catupiry',
    description: 'Molho de tomate, frango, catupiry, mussarela, oregano',
    price: 23.00,
    category: 'Tradicional'
  },
  {
    id: 4,
    name: 'Mexicana',
    description: 'Molho de tomate, mussarela, calabresa, pimenta, cebola, oregano e pimenta',
    price: 19.00,
    category: 'Tradicional'
  },
  
  // ===== PIZZAS ESPECIAIS =====
  {
    id: 5,
    name: 'Calabresa Especial',
    description: 'Molho de tomate, mussarela, calabresa, cebola, oregano, pimenta',
    price: 22.00,
    category: 'Especial'
  },
  {
    id: 6,
    name: 'Portuguesa',
    description: 'Molho de tomate, presunto, ovo, ervilha, mussarela',
    price: 21.00,
    category: 'Tradicional'
  },
  {
    id: 7,
    name: 'Balaguana',
    description: 'Molho de tomate, presunto, calabresa, mussarela, cebola',
    price: 23.00,
    category: 'Tradicional'
  },
  {
    id: 8,
    name: 'Paulista',
    description: 'Molho de tomate, presunto, milho, mussarela, cebola',
    price: 21.00,
    category: 'Tradicional'
  },
  {
    id: 9,
    name: 'Nordestina',
    description: 'Molho de tomate, carne seca, mussarela, cebola',
    price: 23.00,
    category: 'Tradicional'
  },
  {
    id: 10,
    name: 'Lombinho',
    description: 'Molho de tomate, lombinho, mussarela, cebola',
    price: 23.00,
    category: 'Tradicional'
  },
  
  // ===== PIZZAS DOCES =====
  {
    id: 11,
    name: 'Brigadeiro',
    description: 'Chocolate ao leite e granulado',
    price: 23.00,
    category: 'Doce'
  },
  {
    id: 12,
    name: 'Chocolate',
    description: 'Chocolate, morango e leite condensado',
    price: 23.00,
    category: 'Doce'
  },
  {
    id: 13,
    name: 'Romeu e Julieta',
    description: 'Mussarela e goiabada',
    price: 21.00,
    category: 'Doce'
  },
  {
    id: 14,
    name: 'Banana',
    description: 'Mussarela, banana, canela e mel',
    price: 21.00,
    category: 'Doce'
  }
];

// Exportação padrão como backup para garantir compatibilidade
// Isso permite importar usando: import pizzas from '../data/pizzas'
export default pizzas;
