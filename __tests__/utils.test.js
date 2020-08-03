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
    expect(output[0].created_at).toEqual(expect.any(String));
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
      expect(article.created_at).toEqual(expect.any(String));
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

describe.only("makeRefObj", () => {
  test("returns an object given an empty array", () => {
    expect(typeof makeRefObj([])).toBe("object");
  });
});

describe("formatComments", () => {});
