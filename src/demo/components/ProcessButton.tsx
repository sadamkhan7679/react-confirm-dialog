import { Button } from "../../lib/components/Button";
import { useConfirm } from "../../lib/hooks/useConfirm";
import { AlertTriangleIcon } from "../../lib/components/icons";
import { processItems } from "../services/api";

export function ProcessButton() {
  const { confirm, updateDialog } = useConfirm();
  const itemCount = 5;

  const handleProcess = async () => {
    try {
      const confirmed = await confirm({
        title: "Process Items",
        description: `Are you sure you want to process ${itemCount} items?`,
        confirmText: "Process",
        cancelText: "Cancel",
        icon: <AlertTriangleIcon className="h-6 w-6 text-yellow-600" />,
        onConfirm: async () => {
          updateDialog({
            title: "Processing Items",
            description: "Please wait while we process your items...",
          });

          await processItems(itemCount);

          updateDialog({
            title: "Success",
            description: `Successfully processed ${itemCount} items!`,
          });

          // Auto close after success message
          setTimeout(() => {
            updateDialog({
              title: "Process Items",
              description: `Are you sure you want to process ${itemCount} items?`,
            });
          }, 1500);
        },
      });

      if (confirmed) {
        console.log("Processing completed");
      }
    } catch (error) {
      console.error("Processing failed:", error);
    }
  };

  return (
    <Button variant="secondary" onClick={handleProcess}>
      <AlertTriangleIcon className="mr-2 h-4 w-4" />
      Process Items
    </Button>
  );
}
