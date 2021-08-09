import { products } from "./lib/mock.js";

class ProductManager {
  constructor() {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const products = this.products.map((p) => (p.name === product.name ? product : p));

    this.products = products;
  }

  purchaseProduct(name, quantity) {
    const product = this.products.find((product) => product.name === name);

    if (!product) {
      throw new Error("존재하지 않는 상품을 구매하려고 시도했습니다.");
    }

    if (product.quantity < quantity) {
      throw new Error("상품 수량이 부족합니다 상품을 추가해주세요");
    }

    product.quantity -= quantity;

    const products = this.products.map((p) => (p.name === product.name ? product : p));
    this.products = products;
  }
}

export default ProductManager;
