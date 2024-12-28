// Simulated API service
export async function deleteItem(): Promise<void> {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 30% chance of error
      if (Math.random() < 0.3) {
        reject(new Error("Failed to delete item. Please try again."));
      } else {
        resolve(undefined);
      }
    }, 1500); // Simulate network delay
  });
}

export async function saveChanges(): Promise<void> {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 20% chance of error
      if (Math.random() < 0.2) {
        reject(new Error("Network error: Failed to save changes"));
      } else {
        resolve(undefined);
      }
    }, 2000); // Longer delay for save operation
  });
}

export async function processItems(count: number): Promise<void> {
  const steps = ["Preparing", "Processing", "Finalizing"];

  for (const step of steps) {
    // Simulate progress updates
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`${step} ${count} items...`);
        resolve();
      }, 1000);
    });
  }
}
