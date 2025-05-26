DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS article;


-- 📁 category 테이블
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

-- 📁 article 테이블
CREATE TABLE article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  views INT DEFAULT 0,
  isUpdated INT DEFAULT 0,

  FOREIGN KEY (category_id, user_id) REFERENCES category(id)
);

-- 📌 카테고리 더미 데이터
INSERT INTO category (name) VALUES 
('공지사항'),
('자유게시판'),
('질문과 답변'),
('스터디 모집');

-- 📌 게시글 더미 데이터
INSERT INTO article (category_id, title, user_id, content, created_at, views) VALUES
(1, '서버 점검 안내', 101, '서버는 오늘 22시부터 점검에 들어갑니다.', '2024-05-20 10:00:00', 32),
(1, '5월 운영 계획 공지', 102, '운영팀입니다. 5월 운영 계획을 공유드립니다.', '2024-05-21 09:30:00', 27),
(2, '오늘 점심 뭐 먹지?', 201, '고민되네요... 추천 좀 해주세요!', '2024-05-21 12:10:00', 18),
(2, '자유롭게 대화하는 글입니다', 202, '이야기 나누어요~', '2024-05-22 08:22:00', 12),
(3, 'React 상태관리 질문', 301, 'Redux를 써야 할까요, Context로 충분할까요?', '2024-05-21 15:40:00', 46),
(3, 'MySQL join이 잘 안돼요', 302, 'LEFT JOIN이 안 먹혀요. 도와주세요!', '2024-05-22 11:05:00', 23),
(4, '스터디원 모집합니다 (CS)', 401, 'CS 전공 스터디, 온라인으로 함께해요!', '2024-05-23 14:00:00', 51),
(4, '알고리즘 스터디 모집', 402, '백준 골드 이상 문제 위주로 진행합니다.', '2024-05-23 15:20:00', 39);

select * from category;

select * from article
