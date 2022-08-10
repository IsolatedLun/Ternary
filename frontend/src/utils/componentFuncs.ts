import type { Props_CubeCSS } from '../types';

export function propOrDefault<T>(x: T | undefined, def: any): T {
	return x ? x : def;
}

export function createCubeCSSClass(vars: Props_CubeCSS, extra: Props_CubeCSS): string {
	return `
        [ ${propOrDefault(vars.blockClass, '')} ${propOrDefault(extra.blockClass, '')} ] 
        [ ${propOrDefault(vars.compostClass, '')} ${propOrDefault(extra.compostClass, '')} ] 
        [ ${propOrDefault(vars.utilClass, '')} ${propOrDefault(extra.utilClass, '')} ]`;
}

export function defCubeClass(): Props_CubeCSS {
	return {
		blockClass: '',
		compostClass: '',
		utilClass: ''
	};
}

export function combineCubeClasses(self: Props_CubeCSS, other: Props_CubeCSS): Props_CubeCSS {
	return {
		blockClass: propOrDefault(self.blockClass, '') + propOrDefault(other.blockClass, ''),
		compostClass: propOrDefault(self.compostClass, '') + propOrDefault(other.compostClass, ''),
		utilClass: propOrDefault(self.utilClass, '') + propOrDefault(other.utilClass, '')
	};
}
