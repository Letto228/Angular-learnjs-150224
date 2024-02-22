import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// eslint-disable-next-line import/no-unresolved
import AppModule from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
