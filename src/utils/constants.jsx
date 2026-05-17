// Before: 
//export const BASE_URL = "http://localhost:3000";

// After:
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";