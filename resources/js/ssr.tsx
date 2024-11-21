import React from 'react';
import { route } from 'ziggy-js';
import ReactDOMServer from 'react-dom/server';
import createServer from '@inertiajs/react/server';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { RouteContext } from '@/hooks/use-route';

const appName = 'Laravel';

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: title => `${title} - ${appName}`,
    resolve: name =>
      resolvePageComponent(
        `./pages/${name.toLocaleLowerCase()}.tsx`,
        import.meta.glob('./pages/**/*.tsx'),
      ),
    setup: ({ App, props }) => {
      const ssrRoute = (name: any, params: any, absolute: any, config: any) => {
        return route(name, params, absolute, {
          ...config,
          ...(page.props as any).ziggy,
          location: new URL((page.props as any).ziggy.url),
        });
      };
      return (
        <RouteContext.Provider value={ssrRoute as any}>
          <App {...props} />
        </RouteContext.Provider>
      );
    },
  }),
);
