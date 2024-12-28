import { Button } from "../../lib/components/Button";
import { useConfirm } from "../../lib/hooks/useConfirm";
import { SaveIcon } from "../../lib/components/icons";
import { saveChanges } from "../services/api";

export function SaveButton() {
  const { confirm } = useConfirm();

  const handleSave = async () => {
    try {
      const confirmed = await confirm({
        title: "Save Changes",
        description: "Do you want to save all pending changes?",
        confirmText: "Save",
        cancelText: "Cancel",
        icon: <SaveIcon className="h-6 w-6 text-blue-600" />,
        onConfirm: async () => {
          await saveChanges({ data: "example" });
        },
      });

      if (confirmed) {
        console.log("Changes saved successfully");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <Button variant="default" onClick={handleSave}>
      <SaveIcon className="mr-2 h-4 w-4" />
      Save Changes
    </Button>
  );
}
