// Họ & Tên : Nguyễn Văn Phong
// MSSV     : 2180607874

class Product {
   constructor(ID, Name, Cost, Price, Tax, Quantity) {
      this.ID = ID;
      this.Name = Name;
      this.Cost = Cost;
      this.Price = Price;
      this.Tax = Tax;
      this.Quantity = Quantity;
   }
}

let products = [
   new Product(1, "Mác Búc", 1200, 1500, 0.2, 10),
   new Product(2, "Ai Phôn", 500, 700, 0.05, 15),
   new Product(3, "Hét Phôn", 300, 400, 0.8, 5),
   new Product(4, "Mao", 200, 300, 0.15, 8),
   new Product(5, "Cây Bòa", 50, 80, 0.3, 20),
];

let priceDifference = products.map(function (product) {
   return (product.Price * (1 + product.Tax) - product.Cost) * product.Quantity;
});
console.log("Giá chênh lệch giữa giá bán và giá nhập:", priceDifference);

let productsLoss = products.filter(function (product) {
   return product.Price * (1 + product.Tax) <= product.Cost;
});
console.log("Danh sách các sản phẩm bán lỗ:", productsLoss);

let totalPurchaseCost = products.reduce(function (sum, product) {
   return sum + product.Price * (1 + product.Tax) * product.Quantity;
}, 0);
console.log("Tổng số tiền để mua tất cả sản phẩm:", totalPurchaseCost);

let allProfitable = products.every(function (product) {
   return product.Price * (1 + product.Tax) > product.Cost;
});
console.log("Tất cả sản phẩm đều có lãi:", allProfitable);

let anyOutOfStock = products.some(function (product) {
   return product.Quantity < 1;
});
console.log("Có sản phẩm nào hết hàng:", anyOutOfStock);
