export interface Icart {
      product1_name: string,
      product1_price: number,
      product1_tax: number,
      product1_image: string,
      product1_discountVal?: number,
      product2_name?: string,
      product2_price?: number,
      product2_tax?: number,
      product2_image?: string,
      product2_discount?: number,
      product2_discountVal?: number,
      product_id: string,
      category_name?: string,
      combo?: boolean,
      product1_valAfterTax?: any,
      product2_valAfterTax?: any
}
