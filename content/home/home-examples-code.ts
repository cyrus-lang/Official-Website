export const homeExamplesCodeTabs = [
  { value: "hello", translationKey: "examples.tabs.helloWorld" }
];

export const homeExamplesCodeSnippets: Record<string, string> = {
  hello: `import std::mem::arena{ArenaAllocator};
import std::mem::libc{LibcAllocator};
import std::mem{Allocator};
import std::libc{printf};

pub fn main() {
    const allocator: Allocator = dynamic LibcAllocator.new();
    
    var arena = ArenaAllocator.new(allocator, 16);
    defer arena.destroy();

    var x: int32* = arena.alloc(4);
    @assert(x, "allocation failed");

    *x = 10;
    
    printf("x: %d\\n", *x);
}`,
};
