import { ReactQueryProvider } from "./react-query-provider";
type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
