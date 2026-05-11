import createNextIntlPlugin from "next-intl/plugin";
import packageJson from "./package.json";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  env:{
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  }
};

export default withNextIntl(nextConfig);