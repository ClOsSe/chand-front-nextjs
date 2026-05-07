import { ReduxProvider } from "./redux-provider";
import { ReactQueryProvider } from "./react-query-provider";

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}
