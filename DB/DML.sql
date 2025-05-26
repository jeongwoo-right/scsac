-- 비밀번호는 전부 1234 입니다
-- 각자 개인 학번으로 관리자 번호 만들어두었습니다
-- 2400 : 정보 있음 / 시험 전
-- 2401 : 정보 있음 / 시험 후
-- 2500 : 정보 없음 / 시험 전

INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`, `boj_id`) VALUES ('2406', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '1', '24', 'DX', '김혜민', 'hyenem', 'hyenem');
INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`, `boj_id`) VALUES ('2402', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '1', '24', 'DX', '김승기', 'testfirst', 'testfirst');
INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`, `boj_id`) VALUES ('2405', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '1', '24', 'SDS', '김정우', 'jungwoo0405', 'jungwoo0405');
INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`, `boj_id`) VALUES ('2411', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '1', '24', 'DX', '이준영', 'jylee0619', 'jylee0619');
INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`, `boj_id`) VALUES ('2400', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '3', '25', 'SDS', '신사임당', '50000', '50000');
INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`, `affiliate`, `name`, `nickname`) VALUES ('2401', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '2', '25', 'DS', '홍길동', 'cantcallfather');
INSERT INTO `scsac`.`user` (`id`, `password`, `authority`, `generation`) VALUES ('2500', '$2a$12$4Ve5zKH2eFOp4fGHAvv8Q.6qdFZRqsgYKqvuhKacsF0LHU2hWDC56', '3', '5');


-- 📌 카테고리 더미 데이터
INSERT INTO category (title) VALUES 
('공지사항'),
('자유게시판'),
('질문과 답변'),
('스터디 모집');

-- 📌 게시글 더미 데이터
INSERT INTO article (category_id, title, user_id, content, created_at, views, is_updated) VALUES
(1, '서버 점검 안내', '2406', '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:00', 32, 0),
(1, '5월 운영 계획 공지', '2406', '운영팀입니다. 5월 운영 계획을 공유드립니다.', '2024-05-21 09:30:00', 27, 0),
(2, '오늘 점심 뭐 먹지?', '2405', '고민되네요... 추천 좀 해주세요!', '2024-05-21 12:10:00', 18, 1),
(2, '자유롭게 대화하는 글입니다', '2401', '이야기 나누어요~', '2024-05-22 08:22:00', 12, 1),
(3, 'React 상태관리 질문', '2405', 'Redux를 써야 할까요, Context로 충분할까요?', '2024-05-21 15:40:00', 46, 0),
(3, 'MySQL join이 잘 안돼요', '2406', 'LEFT JOIN이 안 먹혀요. 도와주세요!', '2024-05-22 11:05:00', 23, 1),
(4, '스터디원 모집합니다 (CS)', '2411', 'CS 전공 스터디, 온라인으로 함께해요!', '2024-05-23 14:00:00', 51, 1),
(4, '알고리즘 스터디 모집', '2400', '백준 골드 이상 문제 위주로 진행합니다.', '2024-05-23 15:20:00', 39, 0);

select * from category;

select * from article