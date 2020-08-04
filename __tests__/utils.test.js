const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns an empty array when provided an empty array", () => {
    const input = [];
    const output = formatDates(input);
    const expectedOutput = [];
    expect(expectedOutput).toEqual(output);
  });
  test("returns the formatted date for created_at property for one object in array", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
    ];
    const output = formatDates(input);
    expect(output[0].created_at).toEqual(expect.any(Date));
  });
  test("returns the formatted date for the created_at property for all the objects in the array", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256,
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346,
      },
    ];
    const output = formatDates(input);
    output.forEach((article) => {
      expect(article.created_at).toEqual(expect.any(Date));
    });
  });
  test("checks that the original array is not mutated and a new array is returned ", () => {
    const articles = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256,
      },
    ];
    const formattedArticleDates = formatDates(articles);
    expect(formattedArticleDates).not.toBe(articles);
    expect(articles).toEqual([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256,
      },
    ]);
  });
});

describe("makeRefObj", () => {
  test("returns an object given an empty array", () => {
    expect(typeof makeRefObj([])).toBe("object");
  });
  test("returns the correct key-value pair given a single item", () => {
    const article = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
        article_id: 1,
      },
    ];
    expect(makeRefObj(article)).toEqual({
      "UNCOVERED: catspiracy to bring down democracy": 1,
    });
  });
  test("returns the correct key-value pair for multiple articles", () => {
    const articles = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
        article_id: 3,
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
        article_id: 4,
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
        article_id: 5,
      },
    ];
    expect(makeRefObj(articles)).toEqual({
      "Eight pug gifs that remind me of mitch": 3,
      "Student SUES Mitch!": 4,
      "UNCOVERED: catspiracy to bring down democracy": 5,
    });
  });
  test("does not mutate the original array ", () => {
    const article = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
        article_id: 3,
      },
    ];
    makeRefObj(article);
    expect(article).toEqual([
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
        article_id: 3,
      },
    ]);
  });
});

describe("formatComments", () => {
  test("returns an empty array when given an empty array", () => {
    const input = [];
    const formattedComments = formatComments(input);
    expect(formattedComments).toEqual([]);
    expect(formattedComments).not.toBe(input);
  });
  test("returns the correct array when given an array with one input and a reference object && checks that a new array is created", () => {
    const comment = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
        comment_id: 1,
      },
    ];
    const refObject = { "Living in the shadow of a great man": 1 };
    const formattedComments = formatComments(comment, refObject);
    expect(formattedComments).toEqual([
      {
        body: "I hate streaming noses",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: expect.any(Date),
        comment_id: 1,
      },
    ]);
    expect(formattedComments).not.toBe(comment);
  });
  test("returns the correct array when given an array with multiple inputs and a reference object && checks that a new array is created", () => {
    const comments = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
        comment_id: 1,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
        comment_id: 2,
      },
    ];
    const refObject = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 9,
    };
    const formattedComments = formatComments(comments, refObject);
    expect(formattedComments).toEqual([
      {
        body: "I hate streaming noses",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: expect.any(Date),
        comment_id: 1,
      },
      {
        body: "The owls are not what they seem.",
        article_id: 9,
        author: "icellusedkars",
        votes: 20,
        created_at: expect.any(Date),
        comment_id: 2,
      },
    ]);
    expect(formattedComments).not.toBe(comments);
  });

  test("checks that the input array is not mutated ", () => {
    const comment = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
        comment_id: 1,
      },
    ];
    const refObject = { "Living in the shadow of a great man": 1 };
    formatComments(comment, refObject);
    expect(comment).toEqual([
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
        comment_id: 1,
      },
    ]);
  });
});
