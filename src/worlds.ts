import type {Colors} from './schema';

// Every scene lives in its own saturated colour world. Top short-form channels change the whole frame's colour
// constantly; a single dark template measured 0.16 on visual variety against a market median of 0.57.
const world = (bg: string, surface: string, text: string, muted: string, accent: string, accentInk: string): Colors => ({
	bg,
	surface,
	text,
	muted,
	accent,
	accentInk,
	warn: '#FF3B30',
	good: '#12B76A',
});

export const WORLDS = {
	blue: world('#2B3BFF', '#1A26C4', '#FFFFFF', '#CBD2FF', '#FFE14A', '#14163D'),
	coral: world('#FF5A36', '#D93D1C', '#FFFFFF', '#FFE0D6', '#FFF27A', '#3A1206'),
	yellow: world('#FFD21F', '#F2B700', '#15120A', '#5A4800', '#E6204F', '#FFFFFF'),
	teal: world('#07B98C', '#048F6B', '#FFFFFF', '#CFF7EB', '#FFE14A', '#04362A'),
	paper: world('#F4EFE4', '#FFFFFF', '#15151A', '#6A675F', '#FF5A36', '#FFFFFF'),
	violet: world('#7A2CFF', '#5A16CC', '#FFFFFF', '#E0CCFF', '#6DFFC4', '#1F0A47'),
	pink: world('#FF3D9A', '#D61F78', '#FFFFFF', '#FFD6EA', '#FFF27A', '#4A0B2A'),
	sky: world('#35C4FF', '#0FA1DD', '#0B1B2B', '#124059', '#FF3D9A', '#FFFFFF'),
	ink: world('#14141C', '#23232F', '#FFFFFF', '#A9A9B8', '#FF5A36', '#FFFFFF'),
} as const;

export type WorldName = keyof typeof WORLDS;
export const WORLD_NAMES = Object.keys(WORLDS) as WorldName[];
// Order maximises contrast between neighbours when a scene doesn't pick its own world.
export const WORLD_CYCLE: WorldName[] = ['blue', 'yellow', 'coral', 'teal', 'violet', 'paper', 'pink', 'sky'];
