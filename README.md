# 🍕 Amandinha Pizzaria Cajazeiras

![Amandinha Pizzaria](./public/pizza-hero.jpg)

## 📝 Descrição

Aplicativo web da Amandinha Pizzaria Cajazeiras, desenvolvido com React e Material UI. Oferece uma experiência completa para visualização de cardápio, pedidos online e entrega de pizzas, com design responsivo e moderno.

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **Material UI**: Biblioteca de componentes React baseada no Material Design
- **React Router**: Roteamento de páginas
- **Redux**: Gerenciamento de estado global
- **Framer Motion**: Animações fluidas
- **localStorage**: Persistência de dados para o carrinho
- **React Hooks**: Gerenciamento de estado e ciclo de vida
- **CSS-in-JS**: Estilização via Material UI

## ✨ Funcionalidades

- **Design Responsivo**: Interface adaptada para dispositivos móveis e desktop
- **Cardápio Interativo**: Filtragem de pizzas por categoria (salgadas, doces, etc.)
- **Carrinho de Compras**: Adição/remoção de itens com persistência
- **Seleção de Tamanhos**: Escolha entre tamanhos P, M e G com preços dinâmicos
- **Checkout Simplificado**: Processo de finalização de pedido intuitivo
- **Modo Offline**: Suporte para funcionamento com dados em cache
- **Tratamento de Erros**: Feedback visual em caso de problemas de carregamento
- **Animações**: Transições e efeitos visuais para melhor experiência do usuário

## 🔧 Instalação e Uso

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/meu-app-de-pizzas.git
   cd meu-app-de-pizzas
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em:
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a versão de produção
- `npm run preview`: Visualiza a versão de produção localmente

## 📂 Estrutura do Projeto

```
meu-app-de-pizzas/
├── public/                # Arquivos públicos e imagens
├── src/                   # Código fonte do projeto
│   ├── components/        # Componentes reutilizáveis
│   ├── data/              # Dados estáticos (cardápio)
│   ├── pages/             # Páginas da aplicação
│   ├── store/             # Estado global (Redux)
│   ├── theme/             # Configuração do tema
│   ├── utils/             # Funções utilitárias
│   ├── App.js             # Componente principal
│   └── index.js           # Ponto de entrada
└── package.json           # Dependências e scripts
```

## 🌟 Recursos Especiais

### Design Glassmorphism
A barra de navegação utiliza um moderno efeito de vidro (glassmorphism) com gradientes sutis para uma aparência premium.

### Persistência do Carrinho
O carrinho de compras mantém os itens mesmo após o fechamento do navegador, utilizando localStorage.

### Layout Otimizado
Em telas grandes, o conteúdo é centralizado e limitado a 70% da largura para uma melhor legibilidade.

### Tratamento de Erros Robusto
Sistema avançado de detecção e recuperação de erros, com fallbacks visuais e opções de retry.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📱 Contato

**Amandinha Pizzaria Cajazeiras**
- Telefone: (71) 9911-7986
- Email: vitor.arnaud@pizzaria.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ para a Amandinha Pizzaria Cajazeiras.

# App de Pizzaria - Melhorias Técnicas

Este documento contém um resumo das melhorias técnicas implementadas no aplicativo de pizzaria.

## 1. Correções em Hooks e Gerenciamento de Estado

### Problemas resolvidos:
- Reordenação de hooks useCallback e useEffect para evitar dependências circulares
- Adição de dependências corretas nos hooks useEffect
- Correção do useEffect no Navbar para gerenciar corretamente o estado do drawer

## 2. Melhorias no Cache e Armazenamento Local

### Novos recursos:
- Serviço de cache avançado (`cacheService.js`) para gerenciar dados persistentes
- Controle de expiração de cache
- Detecção de disponibilidade de localStorage/sessionStorage
- Melhorias no hook useLocalStorage para suportar:
  - Expiração de dados
  - Escolha entre localStorage e sessionStorage
  - Melhor tratamento de erros

## 3. Compatibilidade de Bibliotecas

### Ajustes:
- Atualização do package.json para versões estáveis e compatíveis
- Downgrade do React para a versão estável 18.2.0
- Correção das versões do Material UI para 5.x
- Alinhamento de dependências relacionadas (framer-motion, redux, etc.)

## 4. Robustez e Tratamento de Erros

### Melhorias:
- Verificação da existência de recursos antes de carregá-los
- Handlers para eventos de erro em carregamento de imagens
- Validação de dados antes do processamento

## 5. Testes Automatizados

### Implementação:
- Configuração de testes para componentes principais
- Exemplo de teste para o componente Navbar
- Uso de mocks para simular diferentes ambientes (mobile/desktop)

## Como executar os testes

```bash
npm test
```

## Próximos passos recomendados

1. Implementar testes para outros componentes principais
2. Adicionar testes de integração para fluxos completos
3. Configurar CI/CD para executar testes automaticamente
4. Implementar monitoramento de erros em produção
