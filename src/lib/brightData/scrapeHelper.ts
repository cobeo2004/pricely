import axios from "axios";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  const brightDataApiKey = String(process.env.BRIGHT_DATA_API_KEY);
  if (!brightDataApiKey) throw new Error("BrightData API key is not set");
  const brightDataUrl = String(process.env.BRIGHT_DATA_URL);
  const brightDataZone = String(process.env.BRIGHT_DATA_ZONE);
  const brightDataFormat = String(process.env.BRIGHT_DATA_FORMAT);
  try {
    const response = await axios.post(
      brightDataUrl,
      {
        url,
        zone: brightDataZone,
        format: brightDataFormat,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${brightDataApiKey}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(
        `Failed to connect to BrightData: ${response.statusText}`
      );
    }
    const data = response.data;
    return data as string;
  } catch (error) {
    throw new Error(
      `An error occurred while scraping the product: ${
        (error as Error).message
      }`
    );
  }
}
