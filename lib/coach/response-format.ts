const COMPLETE_ENDING = /[.!?…)"']$/;

function stripMarkdownSyntax(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureReadableSpacing(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureCompleteEnding(text: string) {
  if (!text || COMPLETE_ENDING.test(text)) {
    return text;
  }

  const paragraphs = text.split(/\n{2,}/);

  if (paragraphs.length > 1) {
    const completeParagraphs = paragraphs.filter((paragraph) =>
      COMPLETE_ENDING.test(paragraph.trim())
    );

    if (completeParagraphs.length > 0) {
      return completeParagraphs.join("\n\n");
    }
  }

  return `${text}.\n\nWhat part of this situation feels hardest for you right now?`;
}

export function formatCoachReply(text: string) {
  return ensureCompleteEnding(ensureReadableSpacing(stripMarkdownSyntax(text)));
}
