import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const ReloadPageOnNavigationBrowser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lastPathRef = useRef<string>(pathname);

  useEffect(() => {
    const handlePopState = () => {
      if (pathname !== lastPathRef.current) {
        lastPathRef.current = pathname;

        router.refresh();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, pathname]);

  return null;
};

export default ReloadPageOnNavigationBrowser;