\c nc_news_test

select articles.*, count(comments.article_id) AS comments_count
from articles
left join comments
on articles.article_id = comments.article_id
where articles.article_id=4
group by articles.article_id;


