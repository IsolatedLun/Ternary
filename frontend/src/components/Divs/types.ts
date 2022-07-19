import type { Props_CubeCSS } from 'src/types';

export interface Props_FlexyCenter extends Props_CubeCSS {
	gap: number;
}

export interface Props_GridySplit extends Props_CubeCSS {
	gap: number;
	repeat: number;
}
