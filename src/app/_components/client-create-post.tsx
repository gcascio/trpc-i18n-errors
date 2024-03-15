"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { api } from "~/trpc/react";
import type { I18nKeys } from "~/server/errors";
import styles from "../index.module.css";

type CreatePostSchema = {
  name: string;
}

export function ClientCreatePost() {
  const router = useRouter();
  const t = useTranslations('posts');
  const {
    register, handleSubmit, formState: { errors }, reset, setError,
  } = useForm<CreatePostSchema>();

  const { mutate: createPost, isPending } = api.post.create.useMutation({
    onSuccess: () => {
      reset();
      router.refresh();
    },
    onError: (error) => {
      const message = t(error.data?.i18nKey as I18nKeys<'posts'> || 'error.generic');

      if (!error.data?.formField) {
        // A better option would be to use toast here to shoe the error to the user
        console.error(message);
        return;
      }

      setError(error.data.formField as keyof CreatePostSchema, { message });
    },
  });

  const onSubmit: SubmitHandler<CreatePostSchema> = (data) => createPost(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <input
        {...register("name", { required: true })}
        type="text"
        placeholder="Title"
        className={styles.input}
      />
      <span className={styles.formError}>
        {errors.name?.message ? errors.name.message : null}
      </span>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}