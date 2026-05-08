import { CandidateReview } from "@/components/candidate-review";
import { getRestaurantCandidates } from "@/lib/restaurants";

export default async function AdminCandidatesPage() {
  const candidates = await getRestaurantCandidates();

  return <CandidateReview candidates={candidates} />;
}
