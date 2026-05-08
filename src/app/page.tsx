import { RestaurantExplorer } from "@/components/restaurant-explorer";
import { getRestaurants } from "@/lib/restaurants";

export default async function Home() {
  const restaurants = await getRestaurants();

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#211c18]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-[#211c18]/10 border-b py-4">
          <span className="text-lg font-bold tracking-normal">또간집 지도</span>
          <span className="text-sm text-[#6f6459]">Next.js + Supabase</span>
        </header>

        <RestaurantExplorer restaurants={restaurants} />
      </section>
    </main>
  );
}
