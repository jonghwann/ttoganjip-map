export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#211c18]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-[#211c18]/10 border-b py-4">
          <span className="text-lg font-bold tracking-normal">또간집 지도</span>
          <span className="text-sm text-[#6f6459]">Next.js + Supabase</span>
        </header>

        <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[360px_1fr]">
          <aside className="flex flex-col gap-4">
            <div>
              <p className="font-medium text-[#b33b2e] text-sm">side project</p>
              <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">
                또간집 선정 맛집을 한눈에.
              </h1>
              <p className="mt-4 text-[#6f6459] leading-7">
                회차별 식당 데이터를 Supabase에 쌓고, 지도에서 지역과 메뉴로 탐색하는
                프로젝트입니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["수집", "YouTube 회차"],
                ["검수", "장소 후보 승인"],
                ["저장", "Supabase DB"],
                ["탐색", "지도 필터"],
              ].map(([label, value]) => (
                <div className="border border-[#211c18]/10 bg-white p-4" key={label}>
                  <p className="text-[#6f6459] text-sm">{label}</p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="relative min-h-[520px] overflow-hidden border border-[#211c18]/10 bg-[#d9e1d2]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,28,24,0.08)_1px,transparent_1px),linear-gradient(rgba(33,28,24,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
            <div className="absolute top-10 left-[18%] h-4 w-4 rounded-full bg-[#b33b2e] shadow-[0_0_0_8px_rgba(179,59,46,0.18)]" />
            <div className="absolute top-[38%] right-[24%] h-4 w-4 rounded-full bg-[#b33b2e] shadow-[0_0_0_8px_rgba(179,59,46,0.18)]" />
            <div className="absolute bottom-[20%] left-[42%] h-4 w-4 rounded-full bg-[#b33b2e] shadow-[0_0_0_8px_rgba(179,59,46,0.18)]" />
            <div className="absolute right-5 bottom-5 border border-[#211c18]/10 bg-white px-4 py-3 text-sm">
              지도 SDK 연결 전 임시 화면
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
