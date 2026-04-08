// 1. Define the Book Data Type
export type BookDataType = {
    id: number;
    title: string;       
    author: string;      
    copies: number;    
    genre: string;    
    languages: string[];
    format: string;      
}

// 2. Constants for Dropdowns, Checkboxes, and Radios
export const bookGenres = [
    "Fiction", 
    "Non-Fiction", 
    "Sci-Fi", 
    "Mystery", 
    "Biography", 
    "History", 
    "Self-Help"
];

export const bookLanguages = [
    "English", 
    "Hindi", 
    "Gujarati", 
    "Marathi", 
    "French", 
    "Spanish"
];

export const bookFormats = [
    "Hardcover", 
    "Paperback", 
    "E-Book", 
    "Audiobook"
];