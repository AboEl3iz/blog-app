function generatePostPromote() {
  return `You are an AI blog writer.

Generate a new blog post about the following topic.

The output must be in valid JSON format and match this structure:

{
  "title": string,              // A compelling blog post title
  "content": string,            // Full blog content (at least 3 paragraphs)
  "coverImage": string | null,  // Optional image URL, or null if not needed
  "tags": string[],             // 3 to 5 relevant tags
  "isDraft": false,             // Always false for generated posts
  "generatedByAI": true         // Always true
}

Topic: "{{user_topic}}"

Respond with JSON only. Do not include any commentary or explanation.`

}


function generatePostSummarize() {
  return `You are an AI assistant that summarizes blog posts.

Given the following blog post, return a JSON object in this format:

{
  "summary": string,     // 2–3 sentence summary of the post
  "tags": string[]       // Up to 5 topic tags
}

Title: "{{title}}"
Content: "{{content}}"

Respond with JSON only. Do not include any explanation.`}


function generateReplyPromote(commentContent: string,postTitle: string, authorName: string) {
  
 
  return `You are an AI assistant that responds to blog comments in a natural, friendly tone.

Given the blog post title, the name of the commenter, and the comment content, write a relevant and polite reply.

The reply should:
- Be 1–2 sentences
- Acknowledge the commenter
- Match the context of the comment
- Be appropriate for the blog post topic

Respond with valid JSON only in the following format:

{
  "reply": string  // AI-generated reply
}

Post Title: ${postTitle}
Comment Author: ${authorName}
Comment: "${commentContent}"

Output JSON only. Do not add any explanations or markdown.

`
}
export const Promotes = {
  generatePostPromote,
  generatePostSummarize,
  generateReplyPromote
};