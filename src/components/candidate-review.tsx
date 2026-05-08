import type { RestaurantCandidate } from "@/types/domain";

type CandidateReviewProps = {
  candidates: RestaurantCandidate[];
};

export function CandidateReview({ candidates }: CandidateReviewProps) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl bg-[#f7f3ec] px-5 py-6 text-[#211c18] sm:px-8">
      <header className="border-[#211c18]/10 border-b pb-5">
        <p className="font-semibold text-[#b33b2e] text-sm">admin</p>
        <h1 className="mt-1 text-3xl font-bold">자동 수집 후보 검수</h1>
        <p className="mt-3 max-w-2xl text-[#6f6459] leading-7">
          자동 수집 파이프라인은 실제 식당 테이블에 바로 쓰지 않고, 먼저 후보 테이블에 저장합니다.
          이 화면에서 승인/거절 액션을 연결하면 운영 검수 흐름이 완성됩니다.
        </p>
      </header>

      <div className="mt-5 grid gap-3">
        {candidates.map((candidate) => (
          <article
            className="grid gap-4 border border-[#211c18]/10 bg-white p-4"
            key={candidate.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[#6f6459] text-sm">
                  {candidate.episode.episodeNo}화 · {candidate.episode.title}
                </p>
                <h2 className="mt-1 text-xl font-bold">{candidate.extractedName}</h2>
              </div>
              <span className="border border-[#b33b2e]/25 px-3 py-1 text-[#b33b2e] text-sm">
                confidence {Math.round(candidate.confidence * 100)}%
              </span>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-[#6f6459]">추출 지역</dt>
                <dd className="mt-1 font-medium">{candidate.extractedArea}</dd>
              </div>
              <div>
                <dt className="text-[#6f6459]">추출 메뉴</dt>
                <dd className="mt-1 font-medium">{candidate.extractedMenu}</dd>
              </div>
              <div>
                <dt className="text-[#6f6459]">매칭 장소</dt>
                <dd className="mt-1 font-medium">{candidate.matchedPlaceName}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center justify-between gap-3 border-[#211c18]/10 border-t pt-3">
              <p className="text-[#6f6459] text-sm">{candidate.matchedAddress}</p>
              <div className="flex gap-2">
                <button
                  className="h-10 border border-[#211c18]/15 px-4 text-sm text-[#6f6459]"
                  type="button"
                >
                  거절
                </button>
                <button className="h-10 bg-[#211c18] px-4 text-sm text-white" type="button">
                  승인
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
