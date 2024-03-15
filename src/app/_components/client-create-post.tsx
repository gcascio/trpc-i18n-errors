"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from 'next-intl';

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function ClientCreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const t = useTranslations('posts');

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={createPost.isPending}
      >
        {createPost.isPending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}