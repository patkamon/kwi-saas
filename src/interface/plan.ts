export interface Plan {
    packageName: string; // Name of the credit package
    amount: string;        // Amount of credits in the package
    price: string;         // Price of the package
    desc: string;          // Description of the package
    selected?: boolean;    // Whether the package is selected (optional, default false)
}