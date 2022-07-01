import { Suspense } from "react";

export default function Suspended(Component: React.ComponentType) {
    return (
        <Suspense fallback={<></>}>
            <Component />
        </Suspense>
    );
}
