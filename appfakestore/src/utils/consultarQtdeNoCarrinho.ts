export const consultarQtdeNoCarrinho = (id: number | undefined, cart: Carrinho): number => {
  if (!cart || !cart.products) {
    return 0;
  }
  const produtoCorrespondente = cart.products.find((produto) => produto.productId === id);
  return produtoCorrespondente?.quantity || 0;
};
