import React from 'react';

import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { RouteContext } from '@/hooks/use-route';
import { ThemeProvider } from '@/components/theme-provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function toKebabCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Insert hyphen between lower-to-upper case letters
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Handle cases like "XMLHttpRequest"
    .toLowerCase();
}

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => {
    // Split the name by '/' and convert each segment
    const segments = name.split('/').map(segment => toKebabCase(segment));

    // Rejoin the segments with '/' to form the converted name
    const convertedName = segments.join('/');

    return resolvePageComponent(
      `./pages/${convertedName}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    );
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <RouteContext.Provider value={(window as any).route}>
          <App {...props} />
        </RouteContext.Provider>
        ,
      </ThemeProvider>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});
