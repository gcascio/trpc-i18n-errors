import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import styles from "../index.module.css";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
  const t = await getTranslations('home');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {t('title')}
        </h1>
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest();
  const tPosts = await getTranslations('posts');
  const tI18n = await getTranslations('i18n');

  return (
    <div className={styles.showcaseContainer}>
      {latestPost ? (
        <p className={styles.showcaseText}>
          {tPosts('mostRecentPost', { name: latestPost.name })}
        </p>
      ) : (
        <p className={styles.showcaseText}>{tPosts('noPosts')}</p>
      )}

      <p className={styles.hintText}>
        {tPosts('tryErrorHint')}
      </p>

      <CreatePost />

      <div className={styles.languageSwitch}>
        <Link href="/en">{tI18n('en')}</Link>
        {' | '}
        <Link href="/de">{tI18n('de')}</Link>
      </div>
    </div>
  );
}
