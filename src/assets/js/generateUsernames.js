/** @format */

const generateUsernames = (word1, word2) => {
  const suffix = ["2021", "21", "theGreat", "10"];
  const prefix = ["great", "good", "the", "brilliant"];

  let suggestions = [];
  suggestions.push(`${word1}${word2}`);
  suffix.forEach((word) => {
    suggestions.push(`${word1}${word}${word2}`);
    suggestions.push(`${word1}${word}`);
    suggestions.push(`${word2}${word}`);
    suggestions.push(`${word1}${word2}${word}`);
  });
  prefix.forEach((word) => {
    suggestions.push(`${word1}${word}${word2}`);
    suggestions.push(`${word}${word1}`);
    suggestions.push(`${word}${word2}`);
    suggestions.push(`${word1}${word}${word2}`);
  });

  return suggestions;
};
export default generateUsernames;
