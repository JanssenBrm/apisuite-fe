import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './hello-world';
test('displays a `Hello World` message', function () {
    render(React.createElement(HelloWorld, null));
    expect(screen.getByText('Hello World')).toBeInTheDocument();
});
test('should return true', function () {
    expect(true).toBe(true);
});
//# sourceMappingURL=hello-world.spec.js.map