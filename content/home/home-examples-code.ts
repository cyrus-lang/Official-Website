export const homeExamplesCodeTabs = [
  { value: "hello", translationKey: "examples.tabs.helloWorld" },
  { value: "concurrency", translationKey: "examples.tabs.concurrency" },
  { value: "data", translationKey: "examples.tabs.httpServer" },
];

export const homeExamplesCodeSnippets: Record<string, string> = {
  hello: `import std::io;

fn main() {
  io::println("Hello, World!");
}

fn greet(name: string): string {
  return io::format("Hello, {}", name);
}

fn example() {
  var message = greet("Cyrus");
  io::println(message);
}`,
  concurrency: "",
  data: "",
};
