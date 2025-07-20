import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetchProducts from "@/features/products/actions/fetchProducts";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductSection({
  selectedProducts,
  setSelectedProducts,
}) {
  const [products, setProducts] = useState([]);
  const [productSelectValue, setProductSelectValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchProducts();
        setProducts(
          products.map((p) => ({
            ...p,
            quantity: 1,
            discount: 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const handleProductSelect = (productId) => {
    setProductSelectValue("");
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    setSelectedProducts((prev) => [...prev, selectedProduct]);
    setProducts(products.filter((p) => p._id != productId));
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Add Products</h2>

      <Select value={productSelectValue} onValueChange={handleProductSelect}>
        <SelectTrigger className="w-50 max-w-80">
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent>
          {products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product) => (
              <SelectItem key={product._id} value={product._id}>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="text-xs text-gray-500">
                    ৳{product.sellPrice}
                  </span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Product Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Sell Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0.25}
                  step={0.25}
                  value={product.quantity}
                  required
                  onChange={(e) =>
                    setSelectedProducts(
                      selectedProducts.map((p) =>
                        p._id === product._id
                          ? { ...p, quantity: e.target.value }
                          : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>{product.inStock}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  value={product.purchasePrice}
                  required
                  onChange={(e) =>
                    setSelectedProducts(
                      selectedProducts.map((p) =>
                        p._id === product._id
                          ? { ...p, purchasePrice: e.target.value }
                          : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  value={product.sellPrice}
                  required
                  onChange={(e) =>
                    setSelectedProducts(
                      selectedProducts.map((p) =>
                        p._id === product._id
                          ? { ...p, sellPrice: e.target.value }
                          : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  placeholder={0}
                  value={product.discount}
                  onChange={(e) =>
                    setSelectedProducts(
                      selectedProducts.map((p) =>
                        p._id === product._id
                          ? { ...p, discount: e.target.value }
                          : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                {(
                  product.quantity * product.sellPrice -
                  product.discount
                ).toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  className="cursor-pointer"
                  size="icon"
                  variant="destructive"
                  tabIndex={-1}
                  onClick={() => {
                    setSelectedProducts((prev) =>
                      prev.filter((p) => p._id !== product._id)
                    );
                    products.push(product);
                  }}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
