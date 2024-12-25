"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  wordplay: z.string().min(1, {
    message: "Wordplay is required.",
  }),
  explanation: z.string().min(1, {
    message: "Explanation is required.",
  }),
  videoURL: z.string().url({ message: "Video URL is required." }),
  timestamp: z.string().time({
    message: "Timestamp is required.",
  }),
  battleEmcee: z.string().min(1, {
    message: "Battle emcee name is required.",
  }),
});

export default function WordPlayForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wordplay: "",
      videoURL: "",
      timestamp: "",
      battleEmcee: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="wordplay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wordplay</FormLabel>
              <FormControl>
                <Input placeholder="Word Play" {...field} />
              </FormControl>
              <FormDescription>
                Comma separated variations of the word (Keeping it simple for
                now)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Wordplay explanation"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Add wordplay explanation here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battle Link</FormLabel>
              <FormControl>
                <Input placeholder="Video URL" type="url" {...field} />
              </FormControl>
              <FormDescription>Battle URL (Youtube, Facebook)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timestamp</FormLabel>
              <FormControl>
                <Input placeholder="Timestamp" type="time" {...field} />
              </FormControl>
              <FormDescription>Video Timestamp</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="battleEmcee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battle Emcee</FormLabel>
              <FormControl>
                <Input placeholder="Battle Emcee" type="time" {...field} />
              </FormControl>
              <FormDescription>
                Battle Emcee Who Spit The Wordplay
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
