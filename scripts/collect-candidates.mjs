const requiredEnv = ["YOUTUBE_API_KEY", "KAKAO_REST_API_KEY", "OPENAI_API_KEY"];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.log("Candidate collection dry-run");
  console.log(`Missing env: ${missingEnv.join(", ")}`);
  console.log(
    JSON.stringify(
      {
        flow: [
          "Fetch latest YouTube episodes",
          "Extract restaurant candidates with an LLM",
          "Match candidates through Kakao Local API",
          "Insert pending rows into restaurant_candidates",
        ],
        candidateShape: {
          episode_id: "uuid",
          extracted_name: "string",
          extracted_area: "string",
          extracted_menu: "string",
          matched_place_name: "string",
          matched_address: "string",
          lat: "number",
          lng: "number",
          map_url: "string",
          confidence: "0..1",
          status: "pending",
          raw_source: "youtube:<video_id>",
        },
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

console.log("All API keys are present. Implement provider calls in this script next.");
