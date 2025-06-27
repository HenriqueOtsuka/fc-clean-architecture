import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";3
import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price,
    );

    if (input.type === "a") {
      const newProduct = product as Product;
      await this.productRepository.create(newProduct);
    } else if (input.type === "b") {
      const newProduct = product as ProductB;
      await this.productRepository.create(newProduct);
    }
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
