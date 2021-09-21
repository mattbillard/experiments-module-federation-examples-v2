import { provideDynamicModFedLoader } from '@company/core-team_shared-tools';
import { IButtonApp1 } from './components/button/button';

const scope = 'exampleTeam1_app1';
const module = './button';
const remoteEntryUrl = '/assets/example-team1_app1/remoteEntry.js';

export const TypedSelfFetchingButton1 = provideDynamicModFedLoader<IButtonApp1>(scope, module, remoteEntryUrl);
