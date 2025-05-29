USE scsac;

-- 👤 사용자 (user.authority는 문자열)
INSERT INTO `user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`, `boj_id`) VALUES
('2406', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Admin', 24, 'DX', '김혜민', 'hyenem', 'hyenem'),
('2402', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Admin', 24, 'DX', '김승기', 'testfirst', 'testfirst'),
('2405', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Admin', 24, 'SDS', '김정우', 'jungwoo0405', 'jungwoo0405'),
('2411', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Admin', 24, 'DX', '이준영', 'jylee0619', 'jylee0619'),
('2400', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Student', 25, 'SDS', '신사임당', '50000', '50000'),
('2401', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Graduate', 25, 'DS', '홍길동', 'cantcallfather', NULL),
('2500', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', 'ROLE_Student', 5, NULL, NULL, NULL, NULL);

-- 📂 게시판 (category.authority도 문자열)
INSERT INTO category (authority, title) VALUES
('ROLE_Admin', '공지사항'),
('ROLE_Student', '자유게시판'),
('ROLE_Student', '질문과 답변'),
('ROLE_Graduate', '스터디 모집'),
('ROLE_Graduate', '졸업생 커뮤니티');

-- 📝 게시글
INSERT INTO article (category_id, title, user_id, content, created_at, views, is_updated) VALUES
(1, '서버 점검 안내', '2406', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:00', 32, 0),
(1, '5월 운영 계획 공지', '2406', '운영팀입니다. 5월 운영 계획을 공유드립니다.', '2024-05-21 09:30:00', 27, 0),
(2, '오늘 점심 뭐 먹지?', '2405', '고민되네요... 추천 좀 해주세요!', '2024-05-21 12:10:00', 18, 1),
(2, '자유롭게 대화하는 글입니다', '2401', '이야기 나누어요~', '2024-05-22 08:22:00', 12, 1),
(3, 'React 상태관리 질문', '2405', 'Redux를 써야 할까요, Context로 충분할까요?', '2024-05-21 15:40:00', 46, 0),
(3, 'MySQL join이 잘 안돼요', '2406', 'LEFT JOIN이 안 먹혀요. 도와주세요!', '2024-05-22 11:05:00', 23, 1),
(4, '스터디원 모집합니다 (CS)', '2411', 'CS 전공 스터디, 온라인으로 함께해요!', '2024-05-23 14:00:00', 51, 1),
(4, '알고리즘 스터디 모집', '2400', '백준 골드 이상 문제 위주로 진행합니다.', '2024-05-23 15:20:00', 39, 0),
(5, '졸업생 모임 어때요?', '2400', '이번 달 말에 번개할까요?', '2024-05-24 18:00:00', 22, 0),
(5, '졸업 후 취업 팁 공유', '2401', '면접 볼 때 이런 부분이 중요했어요.', '2024-05-24 19:00:00', 44, 0);

-- 💬 댓글
INSERT INTO comment (content, user_id, article_id, created_at) VALUES
('좋은 정보 감사합니다!', '2401', 1, '2024-05-20 11:00:00'),
('기대되네요!', '2402', 1, '2024-05-20 11:10:00'),
('김밥 어때요?', '2400', 3, '2024-05-21 12:30:00'),
('Context도 좋아요!', '2406', 5, '2024-05-21 16:00:00'),
('제가 도와드릴게요!', '2405', 6, '2024-05-22 11:10:00'),
('관심 있어요!', '2401', 7, '2024-05-23 14:20:00'),
('참여하고 싶어요!', '2402', 8, '2024-05-23 15:30:00'),
('졸업생 번개 좋네요', '2405', 9, '2024-05-24 18:30:00'),
('도움 많이 됐어요 감사합니다!', '2406', 10, '2024-05-24 19:30:00');

-- 🔔 알림
INSERT INTO alert (article_id, receiver_id, comment_id, sender_id) VALUES
(1, '2406', 1, '2401'),
(1, '2406', 2, '2402'),
(3, '2405', 3, '2400'),
(5, '2405', 4, '2406'),
(6, '2406', 5, '2405'),
(7, '2411', 6, '2401'),
(8, '2400', 7, '2402'),
(9, '2400', 8, '2405'),
(10, '2401', 9, '2406');

INSERT INTO article (category_id, title, user_id, content, created_at, views, is_updated) VALUES
(2, '2', '2406', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:00', 32, 0),
(2, '3', '2406', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:22', 32, 0),
(2, '4', '2405', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:33', 32, 0),
(2, '5', '2406', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:00', 32, 0),
(2, '6', '2406', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:22', 32, 0),
(2, '7', '2405', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:33', 32, 0);