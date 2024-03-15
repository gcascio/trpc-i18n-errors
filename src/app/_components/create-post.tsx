import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ClientCreatePost } from './client-create-post';
 
export function CreatePost() {
  // Receive messages provided in `i18n.ts` …
  const messages = useMessages();
 
  return (
    <NextIntlClientProvider
      messages={
        { posts: messages.posts! }
      }
    >
      <ClientCreatePost />
    </NextIntlClientProvider>
  );
}