export const Auth = ({ children }: { children: React.ReactNode }) => {
  // layout for auth page
  return (
    <div className="h-[100vh] flex items-center justify-center bg-slack">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
};
