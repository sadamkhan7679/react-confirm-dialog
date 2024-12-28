import { Button } from "../../lib/components/Button";
import { useConfirm } from "../../lib/hooks/useConfirm";
import { TrashIcon } from "../../lib/components/icons";
import { deleteItem } from "../services/api";

export function DeleteButton() {
  const { confirm } = useConfirm();

  const handleDelete = async () => {
    try {
      const confirmed = await confirm({
        title: "Delete Item",
        description:
          "Are you sure you want to delete this item? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "destructive",
        icon: <TrashIcon className="h-6 w-6 text-red-600" />,
        onConfirm: async () => {
          await deleteItem("123");
        },
      });

      if (confirmed) {
        console.log("Item deleted successfully");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <TrashIcon className="mr-2 h-4 w-4" />
      Delete Item
    </Button>
  );
}
