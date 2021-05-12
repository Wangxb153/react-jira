import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundry } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* <TsReactTest/> */}
      <ErrorBoundry fallbackRender={FullPageErrorFallback}>
        { user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </ErrorBoundry>
      {/* <ProjectListScreen></ProjectListScreen> */}
    </div>
  );
}

export default App;
