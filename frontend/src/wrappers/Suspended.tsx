import { ReactChildren, Suspense } from "react";

export default function Suspended({ children }: { children: ReactChildren }) {
	return <Suspense fallback={<></>}>{children}</Suspense>;
}
