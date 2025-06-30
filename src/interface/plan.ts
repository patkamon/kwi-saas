export interface Plan {
    id: string;            // Unique identifier for the plan
    packageName: string; // Name of the credit package
    amount: number;        // Amount of credits in the package
    amount_string: string; // Display string for the amount (e.g., "100 Credits")
    price: string;         // Price of the package
    desc: string;          // Description of the package
    selected?: boolean;    // Whether the package is selected (optional, default false)
}