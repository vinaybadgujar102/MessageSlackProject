export default function combineContext(
  ...providers: React.ComponentType<{ children: React.ReactNode }>[]
) {
  /**
   * This combines multiple context together and returns a single context provider
   */

  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight((acc, Currentprovider) => {
      return <Currentprovider>{acc}</Currentprovider>;
    }, children);
  };
}
