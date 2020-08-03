exports.formatDates = (list) => {
  const formattedDates = list.map((article) => {
    copyArticle = { ...article };
    copyArticle.created_at = new Date(article.created_at);
    return copyArticle;
  });
  return formattedDates;
};

exports.makeRefObj = (list) => {
  if (list.length === 0) return {};
  const articleRef = {};
  list.forEach((article) => {
    const articleId = article.article_id;
    const articleTitle = article.title;
    articleRef[articleTitle] = articleId;
  });
  return articleRef;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map((comment) => {
    const newComment = { ...comment };
    newComment.author = comment.created_by;
    delete newComment.created_by;
    newComment.article_id = articleRef[comment.belongs_to];
    delete newComment.belongs_to;
    newComment.created_at = new Date(comment.created_at);
    return newComment;
  });
  return formattedComments;
};
