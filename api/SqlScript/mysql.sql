create schema news_data collate utf8mb3_general_ci;

use news_data;

create table if not exists news_data.news
(
    id        int auto_increment
    primary key,
    title     varchar(100) not null,
    text      text         not null,
    image     varchar(200) null,
    createdAt datetime     null
    );

create table if not exists news_data.comments
(
    id      int auto_increment
    primary key,
    news_id int         not null,
    author  varchar(50) null,
    text    text        not null,
    constraint comments_news_id_fk
    foreign key (news_id) references news_data.news (id)
    on update cascade on delete cascade
    );

INSERT INTO news_data.news (id, title, text, image, createdAt) VALUES (1, 'Tiny kitten saved', 'Tiny kitten saved from Hartlepool recycling plant picking line', null, CURRENT_DATE);
INSERT INTO news_data.news (id, title, text, image, createdAt) VALUES (2, 'Kitten rescued', 'Kitten rescued after spending three days on Barrow roof', null, CURRENT_DATE);
INSERT INTO news_data.news (id, title, text, image, createdAt) VALUES (3, 'Why some cats', 'Why some cats just go where they want', null, CURRENT_DATE);

INSERT INTO news_data.comments (id, news_id, author, text) VALUES (1, 1, 'Emily', 'Yahoo');
INSERT INTO news_data.comments (id, news_id, author, text) VALUES (2, 1, 'Kate', 'poor kitty');
INSERT INTO news_data.comments (id, news_id, author, text) VALUES (3, 2, 'Jack', 'Good job');
INSERT INTO news_data.comments (id, news_id, author, text) VALUES (4, 3, 'Sam', 'cats are evil!');