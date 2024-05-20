"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useConverse } from "@/hooks/converse.hook";
import { PiPaperPlaneFill } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import * as z from "zod";

export default function Home() {
  const [message, setMessage] = useState<string>("Hello!");
  const [thread, setThread] = useState<string>();
  const converse = useConverse(message, thread);
  const schema = z.object({
    prompt: z
      .string()
      .min(1, {
        message:
          "Message is too short. Please enter a message of at least 1 character.",
      })
      .max(400, {
        message: "Message is too long. Please keep it within 400 characters.",
      }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (values.prompt != message) {
      setMessage(values.prompt);
    }
  };

  if (converse.data && !thread) {
    setThread(converse.data.threadId);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col w-full h-full max-w-[800px] items-center gap-4">
        <ScrollArea className="h-[320px] w-full bg-muted/20 rounded-md border p-4">
          {converse.isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-3 w-1/2 bg-primary/20 rounded-lg" />
              <Skeleton className="h-3 w-3/4 bg-primary/20 rounded-lg" />
              <Skeleton className="h-3 w-2/3 bg-primary/20 rounded-lg" />
              <Skeleton className="h-3 w-3/4 bg-primary/20 rounded-lg" />
              <Skeleton className="h-3 w-1/3 bg-primary/20 rounded-lg" />
            </div>
          ) : converse.data ? (
            <ReactMarkdown>{converse.data.content}</ReactMarkdown>
          ) : converse.error ? (
            <p className="text-base indent-4">
              I do not understand what you messaged me. Can you try again?
            </p>
          ) : null}
        </ScrollArea>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="inline-flex w-full items-center gap-3 px-12"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a message..."
                      {...field}
                      className="bg-muted/20"
                      disabled={converse.isLoading}
                    />
                  </FormControl>
                  <FormDescription>Enter a message...</FormDescription>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"icon"}
              className="mt-1"
              disabled={converse.isLoading}
            >
              <PiPaperPlaneFill className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
