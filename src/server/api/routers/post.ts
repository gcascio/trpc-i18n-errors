import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { I18nTRPCError } from "~/server/errors";

let post = {
  id: 1,
  name: "Hello World",
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (input.name === post.name) {
        throw new I18nTRPCError({
          code: 'BAD_REQUEST',
          message: 'Post with this name already exists',
          formField: 'name',
          i18nKey: 'postAlreadyExistsError',
        });
      }

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
