insert into public.episodes (id, episode_no, title, area, youtube_url, published_at)
values
  ('00000000-0000-0000-0000-000000000001', 1, '연남동 맛집 후보', '서울 마포구', 'https://www.youtube.com/', '2022-01-01'),
  ('00000000-0000-0000-0000-000000000002', 2, '성수동 맛집 후보', '서울 성동구', 'https://www.youtube.com/', '2022-01-08'),
  ('00000000-0000-0000-0000-000000000003', 3, '부산 맛집 후보', '부산', 'https://www.youtube.com/', '2022-01-15')
on conflict (episode_no) do nothing;

insert into public.restaurants (
  id,
  name,
  address,
  road_address,
  lat,
  lng,
  category,
  main_menu,
  map_url,
  status
)
values
  ('10000000-0000-0000-0000-000000000001', '연남 샘플식당', '서울 마포구 연남동', '서울 마포구 동교로 샘플길 1', 37.5624, 126.9239, '한식', '김치찌개', 'https://map.kakao.com/', 'needs_verification'),
  ('10000000-0000-0000-0000-000000000002', '성수 샘플분식', '서울 성동구 성수동', '서울 성동구 연무장길 샘플 2', 37.5446, 127.0559, '분식', '떡볶이', 'https://map.kakao.com/', 'needs_verification'),
  ('10000000-0000-0000-0000-000000000003', '부산 샘플국밥', '부산 부산진구', '부산 부산진구 서면로 샘플 3', 35.1579, 129.0592, '국밥', '돼지국밥', 'https://map.kakao.com/', 'needs_verification'),
  ('10000000-0000-0000-0000-000000000004', '마포 샘플고기', '서울 마포구 합정동', '서울 마포구 양화로 샘플 4', 37.5497, 126.9140, '고기', '삼겹살', 'https://map.kakao.com/', 'needs_verification'),
  ('10000000-0000-0000-0000-000000000005', '성수 샘플면옥', '서울 성동구 성수동2가', '서울 성동구 아차산로 샘플 5', 37.5412, 127.0611, '면', '냉면', 'https://map.kakao.com/', 'needs_verification')
on conflict (id) do nothing;

insert into public.appearances (restaurant_id, episode_id, selected_label, note)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '샘플 후보', '실제 또간집 데이터로 교체 필요'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '샘플 후보', '실제 또간집 데이터로 교체 필요'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '샘플 후보', '실제 또간집 데이터로 교체 필요'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '샘플 후보', '실제 또간집 데이터로 교체 필요'),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', '샘플 후보', '실제 또간집 데이터로 교체 필요')
on conflict (restaurant_id, episode_id) do nothing;

insert into public.restaurant_candidates (
  episode_id,
  extracted_name,
  extracted_area,
  extracted_menu,
  matched_place_name,
  matched_address,
  lat,
  lng,
  map_url,
  confidence,
  status,
  raw_source
)
values
  ('00000000-0000-0000-0000-000000000001', '연남 샘플식당', '서울 마포구', '김치찌개', '연남 샘플식당', '서울 마포구 동교로 샘플길 1', 37.5624, 126.9239, 'https://map.kakao.com/', 0.780, 'pending', 'demo-seed'),
  ('00000000-0000-0000-0000-000000000002', '성수 샘플분식', '서울 성동구', '떡볶이', '성수 샘플분식', '서울 성동구 연무장길 샘플 2', 37.5446, 127.0559, 'https://map.kakao.com/', 0.840, 'pending', 'demo-seed');
