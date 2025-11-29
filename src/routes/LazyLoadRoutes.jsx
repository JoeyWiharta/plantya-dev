import React, { lazy, Suspense, suspense } from 'react';
import ContentLoading from '../common/ContentLoading';

// Lazy Function
const LazyLoadRoutes = (importFunc) => {
    debugger
    const LazyElement = lazy(importFunc);

    return (
        <Suspense
            fallback=
            {
                <ContentLoading text='Loading...' />
            }
        >
            <LazyElement />
        </Suspense >
    );
}
export default LazyLoadRoutes