import type { carFetchType, carType } from "../utils/globle";

// TIP: Since you're building a "DriveWay" app, 
// consider renaming 'product' to 'cars' in your db.json and URL later.
const carURL = "http://localhost:3000/product/";

/**
 * Adds a new vehicle to the inventory
 */
export const addCar = async (body: carType) => {
    const res = await fetch(carURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    return res.ok;
}

/**
 * Retrieves all available cars from the database
 */
export const fetchAllCars = async () => {
    const res = await fetch(carURL);
    if (!res.ok) return [];
    
    const allCarData = await res.json();
    return allCarData;
}

/**
 * Removes a vehicle record by its ID
 */
export const deleteCar = async (id: string) => {
    const res = await fetch(carURL + id, {
        method: "DELETE"
    });

    return res.ok;
}

/**
 * Fetches details for a specific vehicle (useful for Edit or Details pages)
 */
export const fetchSingleCar = async (id: string) => {
    const res = await fetch(carURL + id, { method: "GET" });
    
    if (!res.ok) return null;
    
    const singleCar = await res.json();
    return singleCar;
}

/**
 * Updates an existing vehicle's information (Price, Stock, etc.)
 */
export const updateCar = async (body: carFetchType) => {
    const res = await fetch(carURL + body.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    return res.ok;
}