exports.formatDates = (list) => {
  const formattedDates = list.map((article) => {
    copyArticle = { ...article };
    copyArticle.created_at = Date(article.created_at);
    return copyArticle;
  });
  return formattedDates;
};

exports.makeRefObj = (list) => {
  if (list.length === 0) return {};
};

exports.formatComments = (comments, articleRef) => {};
