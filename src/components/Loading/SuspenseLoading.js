import React, {Suspense} from 'react';

const suspenseLoading = (WrappedComponent) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WrappedComponent />
        </Suspense>
    )
}

export default suspenseLoading;
