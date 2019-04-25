import rehype from "rehype"
import sanitize from "rehype-sanitize"

export const sanitizeHtml = (html, schema = defaultSanitizeSchema) => {
  const outputHtml = rehype()
    .data("settings", { fragment: true })
    .use(sanitize, schema)
    .processSync(html)
  return String(outputHtml)
}

// Configuration. If not given, defaults to GitHub style sanitation.
// If any top-level key isn’t given, it defaults to GH’s style too.
// https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
export const defaultSanitizeSchema = {
  strip: ["script"],
  tagNames: ["a", "b", "li"],
  attributes: {
    "*": [],
    a: ["href"],
  },
  ancestors: {
    // li: ["ol", "ul"],
  },
}
