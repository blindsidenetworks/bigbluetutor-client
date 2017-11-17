import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { DsService } from '../shared/ds.service';

platformBrowserDynamic().bootstrapModule(AppModule,[DsService]);
