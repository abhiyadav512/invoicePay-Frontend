import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useCreateInvoice } from "../apis/invoices/useInvoices";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ItemField = "description" | "quantity" | "amount";
type Item = { description: string; quantity: number; amount: number };

const CreateInvoicePage = () => {
  const createInvoiceMutation = useCreateInvoice();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    currency: "INR",
    dueDate: "",
    notes: "",
  });

  const [items, setItems] = useState<Item[]>([
    { description: "", quantity: 1, amount: 0 },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateItemAmount = (
    index: number,
    field: ItemField,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value as never;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.clientEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const today = new Date();
    const dueDate = new Date(formData.dueDate);
    if (!formData.dueDate || dueDate < new Date(today.toDateString())) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    const validItems = items.filter(
      (item) => item.description.trim() && item.quantity > 0 && item.amount > 0
    );

    if (validItems.length === 0) {
      toast.error(
        "Add at least one valid item with positive quantity and amount."
      );
      return;
    }

    try {
      const validItems = items.filter(
        (item) =>
          item.description.trim() && item.quantity > 0 && item.amount > 0
      );

      if (validItems.length === 0) {
        toast.error("Please add at least one valid item.");
        return;
      }

      const invoiceData = {
        ...formData,
        items: validItems,
      };

      const response = await createInvoiceMutation.mutateAsync(invoiceData);
      const invoiceId = response?.data?.id;

      if (invoiceId) {
        toast.success("Invoice created successfully!");
        navigate(`/invoice/${invoiceId}`);
      } else {
        throw new Error("Invoice ID not returned from server.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create invoice. Please try again."
      );
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 ">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold">Create New Invoice</h1>
        <p className="text-sm opacity-70">
          Fill in the details to create a new invoice
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) =>
                    handleInputChange("clientName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="client@example.com"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    handleInputChange("clientEmail", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    handleInputChange("currency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes or payment terms..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 font-medium text-sm opacity-70 pb-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-3">Amount</div>
              <div className="col-span-1"></div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="space-y-4 md:space-y-0">
                <div className="md:hidden space-y-3 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">
                      Item {index + 1}
                    </span>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Description</Label>
                    <Input
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) =>
                        updateItemAmount(index, "description", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItemAmount(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Amount</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.amount}
                        onChange={(e) =>
                          updateItemAmount(
                            index,
                            "amount",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <Input
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) =>
                        updateItemAmount(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemAmount(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) =>
                        updateItemAmount(
                          index,
                          "amount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="w-full mt-4 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 cursor-pointer"
            disabled={createInvoiceMutation.isPending}
          >
            {createInvoiceMutation.isPending
              ? "Creating Invoice..."
              : "Create Invoice"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
