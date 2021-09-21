import { provideDynamicModFedLoader } from '@company/core-team__shared-tools';
import { IButtonApp1 } from './components/button/button';

const scope = 'exampleTeam1__app1';
const module = './button';
const remoteEntryUrl = '/assets/example-team1__app1/remoteEntry.js';

export const TypedSelfFetchingButton1 = provideDynamicModFedLoader<IButtonApp1>(scope, module, remoteEntryUrl);
