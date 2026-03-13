export default async function fetchData<Interface>(url: string): Promise<Interface | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    return null;    
  }
}