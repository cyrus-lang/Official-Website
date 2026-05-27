export const homeExamplesCodeTabs = [
  { value: "hello", translationKey: "examples.tabs.helloWorld" }
];

export const homeExamplesCodeSnippets: Record<string, string> = {
  hello: `import std::libc{printf};

fn main() {
  printf("Hello, World!");
}`,
};
