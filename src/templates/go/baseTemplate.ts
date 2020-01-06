import { BaseTemplate } from '../../baseTemplate';

export abstract class GoBaseTemplate extends BaseTemplate {
  get languages(): string[] {
    return ['go'];
  }
}
