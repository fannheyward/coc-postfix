import { BaseTemplate } from '../../baseTemplate';

export abstract class PyBaseTemplate extends BaseTemplate {
  get languages(): string[] {
    return ['python'];
  }
}
