# Code Reviews

## Performance concerns
- [ ] There is a huge amount of meme to render so we should use a virtualized list to render them
- [X] The first problem why the render is so slow is that we're fetching all page before starting render, we should consider render as we fetch pattern 
- [X] Use react-query infinite fetching to fetch memes by page

## Code quality concerns

- [X] We should extract MemeFeedPage from index.tsx into pages folder
- [X] We should extract all useQuery stuff into a custom hook
- [X] The name of a component file should be in PascalCase and be the same as the component name
- [X] We need refactor api.ts into a dedicated folder with a Service entry point
- [X] MemeFeedPage is too big, we should split it into smaller components
