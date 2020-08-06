\c nc_news_test

select articles.author,articles.votes, articles.title, articles.article_id, articles.topic, count(comments.article_id) AS comment_count
from articles
left join comments
on articles.article_id = comments.article_id
group by articles.article_id
order by articles.article_id DESC


