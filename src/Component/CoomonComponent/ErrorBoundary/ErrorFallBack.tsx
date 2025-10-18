import React from 'react'

interface ErrorFallBackProps {
    error: Error;
    resetErrorBoundary: () => void;
}
const ErrorFallBack = ({ error, resetErrorBoundary }: ErrorFallBackProps) => {
    return (
      <>
        <div className="text-center text-3xl">{error.message}</div>
        <div ><button className='p-3 bg-primary-500 rounded' onClick={resetErrorBoundary}>Retry</button></div>
      </>
    );
};

export default ErrorFallBack