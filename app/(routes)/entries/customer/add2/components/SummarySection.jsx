import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { SHIPPING_METHODS } from "@/constants/shippingMethods";

export default function SummarySection({
  shippingCustomer,
  setShippingCustomer,
  shippingMerchant,
  setShippingMerchant,
  shippingMethod,
  setShippingMethod,
  setOtherCost,
  note,
  setNote,
  courierTax,
  setCourierTax,
  overallDiscount,
  setOverallDiscount,
  subtotal,
  paidByCustomer,
  totalPurchasePrice,
  totalShippingCharge,
  totalIncome,
  netProfit,
}) {
  return (
    <section className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping & Options */}
        <div className="flex flex-col gap-y-4 justify-between *:flex *:flex-col *:gap-1">
          <div>
            <Label className="text-sm" htmlFor="shippingCustomer">
              Shipping Charge (Customer)
            </Label>
            <Input
              type="number"
              name="shippingCustomer"
              id="shippingCustomer"
              placeholder={shippingCustomer}
              min={0}
              value={0}
              onChange={(e) => setShippingCustomer(Number(e.target.value))}
            />
          </div>
          <div>
            <Label className="text-sm" htmlFor="shippingMerchant">
              Shipping Charge (Merchant)
            </Label>
            <Input
              type="number"
              id="shippingMerchant"
              name="shippingMerchant"
              placeholder={shippingMerchant}
              min={0}
              value={0}
              onChange={(e) => setShippingMerchant(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="shippingMethod">Shipping Method</Label>
            <Select
              value={shippingMethod}
              onValueChange={(value) => setShippingMethod(value)}
              id="shippingMethod"
              name="shippingMethod"
            >
              <SelectTrigger className="w-full" tabIndex={-1}>
                <SelectValue placeholder="Shipping Method" />
              </SelectTrigger>
              <SelectContent>
                {SHIPPING_METHODS.map((shippingMethod, index) => (
                  <SelectItem key={index} value={shippingMethod}>
                    {shippingMethod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="otherCost">Other Cost</Label>
            <Input
              type="number"
              name="otherCost"
              id="otherCost"
              placeholder={0}
              min={0}
              value={0}
              onChange={(e) => setOtherCost(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Summary Table */}
        <div>
          <Table className="border-separate border-spacing-0">
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell>{subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Paid by Customer</TableCell>
                <TableCell>{paidByCustomer.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping Charge</TableCell>
                <TableCell>{totalShippingCharge.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Courier Tax</TableCell>
                <TableCell>
                  <Input
                    id="courierTax"
                    name="courierTax"
                    type="number"
                    placeholder={0}
                    min={0}
                    value={courierTax}
                    onChange={(e) => setCourierTax(Number(e.target.value))}
                    className="w-20"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Income</TableCell>
                <TableCell>{totalIncome.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Purchase</TableCell>
                <TableCell>{totalPurchasePrice.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Overall Discount</TableCell>
                <TableCell>
                  <Input
                    id="overallDiscount"
                    name="overallDiscount"
                    type="number"
                    placeholder={0}
                    value={overallDiscount}
                    onChange={(e) => setOverallDiscount(Number(e.target.value))}
                    className="w-20"
                  />
                </TableCell>
              </TableRow>
              <TableRow className="font-semibold">
                <TableCell>Net Profit</TableCell>
                <TableCell>{netProfit.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <Label className="text-sm" htmlFor="note">
          Note
        </Label>
        <Textarea
          className="min-h-24"
          name="note"
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline
              // Shift focus to the next form element
              const form = e.target.form;
              const index = Array.prototype.indexOf.call(form, e.target);
              const next = form.elements[index + 1];
              if (next) {
                next.focus();
              }
            }
          }}
        ></Textarea>
      </div>
    </section>
  );
}
