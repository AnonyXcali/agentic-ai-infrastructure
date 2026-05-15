function extractCode(input: string): string {
  const match = input.match(
    /```(?:typescript|ts|javascript|js)?\s*([\s\S]*?)```/i,
  );

  return (match?.[1] ?? input).trim();
}

export { extractCode };
