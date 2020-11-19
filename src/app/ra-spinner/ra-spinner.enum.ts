export const DEFAULTS = {
  BD_COLOR: 'rgba(51,51,51,0.8)',
  SPINNER_COLOR: '#fff',
  SPINNER_TYPE: 'ball-scale-multiple',
  Z_INDEX: 99999,
  DIV_COUNTS: 3
};

export const PRIMARY_SPINNER = 'primary';

export type Size = 'default' | 'small' | 'medium' | 'large';

export interface Spinner {
  bdColor?: string;
  size?: Size;
  color?: string;
  type?: string;
  fullScreen?: boolean;
  zIndex?: number;
  name?: string;
}

export class RaSpinner {
  name: string;
  bdColor: string;
  size: Size;
  color: string;
  type: string;
  class: string;
  divCount: number;
  divArray: Array<number>;
  fullScreen: boolean;
  show: boolean;
  zIndex: number;

  constructor(name: string = null, show: boolean = false) {
    this.name = name;
    this.show = show;
  }
}
