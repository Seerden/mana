import { PropsWithChildren, Suspense } from "react";

export default function Suspended(props: PropsWithChildren) {
	return <Suspense fallback={<></>}>{props.children}</Suspense>;
}
