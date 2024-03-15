import { TRPCError } from '@trpc/server';
import type { useTranslations } from 'next-intl';

type I18nNamespaceKeys = Exclude<Parameters<typeof useTranslations>[0], undefined>;
export type I18nKeys<T extends I18nNamespaceKeys = I18nNamespaceKeys>
  = Parameters<ReturnType<typeof useTranslations<T>>>[0];

export class I18nTRPCError extends TRPCError {
  public readonly i18nKey: I18nKeys;

  public readonly formField?: string;

  constructor(opts: {
    i18nKey: I18nKeys;
    formField?: string
  } & ConstructorParameters<typeof TRPCError>[0]) {
    const { i18nKey, formField, ...rest } = opts;
    super(rest);

    this.i18nKey = i18nKey;
    this.formField = formField;
  }
}