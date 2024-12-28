import { ConfirmProvider } from "../lib/hooks/useConfirm";
import { DeleteButton } from "./components/DeleteButton";
import { SaveButton } from "./components/SaveButton";
import { ProcessButton } from "./components/ProcessButton";

export default function App() {
  return (
    <ConfirmProvider>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              Confirmation Dialog Demo
            </h1>
            <p className="text-slate-600">
              Try out different confirmation scenarios with loading states and
              error handling
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <DeleteButton />
            <SaveButton />
            <ProcessButton />
          </div>

          <div className="text-sm text-slate-500">
            <p>* Delete has 30% chance of error</p>
            <p>* Save has 20% chance of error</p>
            <p>* Process shows progress updates</p>
          </div>
        </div>
      </div>
    </ConfirmProvider>
  );
}
