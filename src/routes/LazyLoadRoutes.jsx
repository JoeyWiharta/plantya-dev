import React, { lazy, Suspense, suspense } from 'react';
import ContentSpinner from '../components/common/ContentSpinner';

// Lazy Function
const LazyLoadRoutes = (importFunc) => {
    const LazyElement = lazy(importFunc);

    return (
        <Suspense
            fallback=
            {
                <ContentSpinner text='Loading...' />
            }
        >
            <LazyElement />
        </Suspense >
    );
}
export default LazyLoadRoutes