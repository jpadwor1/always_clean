"use server";

type AutocompletePrediction = {
  placePrediction?: {
    placeId?: string;
    text?: {
      text?: string;
    };
    structuredFormat?: {
      mainText?: {
        text?: string;
      };
      secondaryText?: {
        text?: string;
      };
    };
  };
  queryPrediction?: {
    text?: {
      text?: string;
    };
  };
};

export const autocomplete = async (input: string) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey || !input.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
        },
        body: JSON.stringify({
          input,
          includedRegionCodes: ["us"],
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Google autocomplete failed:", await response.text());
      return [];
    }

    const data = await response.json();
    return (data.suggestions ?? []) as AutocompletePrediction[];
  } catch (error) {
    console.error(
      "Error fetching Google Maps autocomplete predictions:",
      error,
    );
    return [];
  }
};
