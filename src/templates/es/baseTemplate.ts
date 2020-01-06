import { BaseTemplate } from '../../baseTemplate';

export abstract class ESBaseTemplate extends BaseTemplate {
  get languages(): string[] {
    return ['typescript', 'javascript'];
  }
}
